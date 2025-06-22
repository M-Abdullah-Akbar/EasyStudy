import { generateNotesAiModel, generateStudyTypeContentAiModel, generateQuizAiModel, generateQAAiModel } from "@/configs/aiModel";
import { inngest } from "./client";
import { db } from "@/db/index";
import { usersTable, chapterNotesTable, studyMaterialTable, flashCardTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const checkNewUser = inngest.createFunction(
  { id: "check-user" },
  { event: "user.check" },
  async ({ event, step }) => {
    const { user } = event.data;
    
    console.log("checkNewUser function triggered for user:", user?.primaryEmailAddress?.emailAddress);
    
    const result = await step.run("Check user and create new user if not in db", async () => {
      try {
        // Check if the user is new or not
        const result = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
        
        console.log("Database check result:", result);
        
        //If not add to the database
        if (result?.length == 0) {
          console.log("New user detected, creating user record...");
          
          const userResponse = await db
            .insert(usersTable)
            .values({
              email: user?.primaryEmailAddress?.emailAddress,
              name: user?.fullName,
            })
            .returning({ id: usersTable.id });

          console.log("User created successfully:", userResponse);
          return userResponse;
        } else {
          console.log("User already exists in database");
        }
        return result;
      } catch (error) {
        console.error("Error in checkNewUser function:", error);
        throw error;
      }
    });
    
    console.log("checkNewUser function completed successfully");
    return "success";
  }
);

export const generateNotes = inngest.createFunction(
  { id: "generate-notes" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    await step.run("Generate and Save Chapter Notes", async () => {
      const chapters = course.courseLayout.Chapters;
      
      const generationPromises = chapters.map(async (chapter, index) => {
        console.log("Generating notes for Chapter:", chapter.title);
        const PROMPT = `Generate detail content for each chapter title + add everything related to that chaptertitle's topics like if it requires code then add some code , Make sure to include all topic points in the content, Make sure to give content in HTML format + make each heading tag bold(Do not add HTML, head, body, title, tags) . The chapters: ${JSON.stringify(chapter)}`;
        
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text();
        
        await db.insert(chapterNotesTable).values({
          courseId: course?.courseId,
          chapterId: index,
          notes: aiResp,
        });
        
        console.log("Notes saved for Chapter:", chapter.title);
      });

      await Promise.all(generationPromises);
      return "All chapter notes generated and saved successfully.";
    });

    // Mark course as Ready after notes generation
    await step.run("Update Course Status to Ready", async () => {
      await db
        .update(studyMaterialTable)
        .set({ status: "Ready" })
        .where(eq(studyMaterialTable.courseId, course?.courseId));
      console.log(`Course status updated to 'Ready' for courseId: ${course?.courseId}`);
      return "Success";
    });

    return { status: "success", message: "Course generation complete." };
  }
);


export const generateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    const aiResult = await step.run("Generating Content using Ai", async () => {
      let result;
      switch(studyType) {
        case 'Flashcard':
          result = await generateStudyTypeContentAiModel.sendMessage(prompt);
          break;
        case 'Quiz':
          result = await generateQuizAiModel.sendMessage(prompt);
          break;
        case 'QA':
          result = await generateQAAiModel.sendMessage(prompt);
          break;
        default:
          result = await generateStudyTypeContentAiModel.sendMessage(prompt);
      }
      const aiResp = JSON.parse(result.response.text());
      return aiResp;
    })
    
    const dbResult = await step.run("Saving result to DB", async () => {
      const result = await db.update(flashCardTable).set({
        content: aiResult,
        status: 'Ready',
      }).where(eq(flashCardTable.id, recordId));
      return 'Data Inserted';
    })
    
    return { status: "success", recordId: recordId };
  }
);