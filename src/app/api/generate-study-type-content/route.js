import { db } from "@/db/index";
import { flashCardTable } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { chapters, courseId, type, topic, difficultyLevel } = await request.json();
    let PROMPT;
    
    // Fallback for topic if not provided
    const courseTopic = topic || 'the given topics';

    switch(type) {
        case 'Flashcard':
            PROMPT = `Generate 15 flashcards for a course on '${courseTopic}' with a difficulty of '${difficultyLevel}'. The flashcards should cover the following key chapter titles: ${chapters}. The output must be in JSON format with 'front' and 'back' content for each card.`;
            break;
        case 'Quiz':
            PROMPT = `Generate a quiz with 10 questions for a course on '${courseTopic}' with a difficulty of '${difficultyLevel}'. The quiz should test knowledge on the following key chapter titles: ${chapters}. The output must be a JSON array of objects, where each object has a 'questionText', an array of 'options', and the 'correctAnswer'.`;
            break;
        case 'QA':
            PROMPT = `Generate 10 common questions and detailed answers for a course on '${courseTopic}' with a difficulty of '${difficultyLevel}'. The questions should be based on these chapter titles: ${chapters}. The output must be a JSON array of objects, each with a 'question' and a detailed 'answer'.`;
            break;
        default:
            PROMPT = `Generate detailed content on the topic of '${courseTopic}', focusing on the following chapters: ${chapters}.`;
    }

    // Create the record first
    const result = await db.insert(flashCardTable).values({
        courseId: courseId,
        type: type,
        status: "Generating"
    }).returning({ id: flashCardTable.id });

    const recordId = result[0].id;

    // Trigger the content generation
    await inngest.send({
        name: "studyType.content",
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: recordId
        },
    });

    return NextResponse.json(recordId);
}