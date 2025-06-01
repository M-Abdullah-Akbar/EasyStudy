import { db } from "@/db/index";
import { flashCardTable } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {chapters, courseId, type} = await request.json();
    let PROMPT;
    
    switch(type) {
        case 'Flashcard':
            PROMPT = `Generate flashcard on topic: ${chapters} in JSON Format with front bakc content, Maximum 15`;
            break;
        case 'Quiz':
            PROMPT = `Generate quiz on topic: ${chapters} with Question and options along with correct answer in JSON Format.`;
            break;
        case 'QA':
            PROMPT = `Generate 10 common questions and detailed answers about ${chapters} in JSON Format. Each answer should be comprehensive and include examples where relevant.`;
            break;
        default:
            PROMPT = `Generate content on topic: ${chapters}`;
    }

    const result = await db.insert(flashCardTable).values({
        courseId: courseId,
        type: type,
    }).returning({ id: flashCardTable.id });

    inngest.send({
        name: "studyType.content",
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        },
    });
    return NextResponse.json(result[0].id);
}