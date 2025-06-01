import { generateNotesAiModel, generateStudyTypeContentAiModel, generateQuizAiModel, generateQAAiModel } from "@/configs/aiModel";
import { inngest } from "./client";
import { db } from "@/db/index";
import { usersTable, chapterNotesTable, studyMaterialTable, flashCardTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import axios from "axios";

export const checkNewUser = inngest.createFunction(
  { id: "check-user" },
  { event: "user.check" },
  async ({ event, step }) => {
    const { user } = event.data;
    const result = await step.run("Check user and create new user if not in db", async () => {
      // Check if the user is new or not
      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
      
      //If not add to the database
      if (result?.length == 0) {
        const userResponse = await db
          .insert(usersTable)
          .values({
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
          })
          .returning({ id: usersTable.id });

        // Send welcome email for new users
        try {
          await axios.post(`${process.env.HOST_URL}/api/send-welcome-email`, {
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
          });
          console.log("Welcome email sent successfully to:", user?.primaryEmailAddress?.emailAddress);
        } catch (error) {
          console.error("Failed to send welcome email:", error.message);
        }

        return userResponse;
      }
      return result;
    });
    return "success";
  }
);

export const generateNotes = inngest.createFunction(
  { id: "generate-notes" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;
    const notesResult = await step.run("Generate Chapter Notes", async () => {
      // Call the API to generate notes
      const chapters = course.courseLayout.Chapters;
      let index=0;
      chapters.forEach(async(chapter) => {
        console.log("Chapter", chapter);
        const PROMPT = `Generate detail content for each chapter title + add everything related to that chaptertitle's topics like if it requires code then add some code , Make sure to include all topic points in the content, Make sure to give content in HTML format + make each heading tag bold(Do not add HTML, head, body, title, tags) . The chapters:` + JSON.stringify(chapter);
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text();
        await db.insert(chapterNotesTable).values({
          courseId: course?.courseId,
          chapterId: index,
          notes: aiResp,
        });
        console.log("Chapter Notes", aiResp);
        // Save the notes to the database

        index=index+1;
      });
      return "Completed";
    });
    const updateCourseStatusResult = await step.run(
      "Update Course Status to Ready",
      async () => {
        const result = await db
          .update(studyMaterialTable)
          .set({ status: "Ready" })
          .where(eq(studyMaterialTable.courseId, course?.courseId));
        return "Success";
      }
    );
    return "success";
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
  }
);