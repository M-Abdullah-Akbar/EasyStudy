import { studyMaterialTable, usersTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { courseOutline } from "@/configs/aiModel";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export async function POST(request) {
    const { courseId, studyType, topic, difficultyLevel, createdBy, createdAt } = await request.json();
    
    // Get user details to check subscription status
    const userResult = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, createdBy));

    const user = userResult[0];
    
    // Check if user has reached course limit
    if (!user.isMember && user.totalCourses >= 5) {
        return NextResponse.json(
            { error: "You have reached the maximum limit of 5 courses. Please upgrade to create more courses." },
            { status: 403 }
        );
    }

    const PROMPT = `Generate a study material for ${topic} and level of difficulty will be ${difficultyLevel} with Course Title, summary of course, List of chapters (Max 3) along with summary and emoji icon for each chapter, Topic list in each chapter, All results in JSON Format.`;
    // Generate course layout using ai
    const aiResp = await courseOutline.sendMessage(PROMPT);
    const aiResult = JSON.parse(aiResp.response.text());
    
    // Insert the course
    const courseResult = await db.insert(studyMaterialTable).values({
        courseId: courseId,
        courseType: studyType,
        topic: topic,
        difficultyLevel: difficultyLevel,
        courseLayout: aiResult,
        createdBy: createdBy,
        createdAt: createdAt
    }).returning({ resp: studyMaterialTable });

    // Increment totalCourses count
    await db.update(usersTable)
        .set({ totalCourses: user.totalCourses + 1 })
        .where(eq(usersTable.email, createdBy));

    // Trigger notes generation only
    const notesResult = await inngest.send({
        name: "notes.generate",
        data: {
            course: courseResult[0].resp,
        },
    });

    return NextResponse.json({result: courseResult[0]});
}