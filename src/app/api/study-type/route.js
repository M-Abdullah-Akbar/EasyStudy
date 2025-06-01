import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { and, eq } from "drizzle-orm";
import { chapterNotesTable, flashCardTable } from "@/db/schema";

export async function POST(req) {
    const { courseId, studyType } = await req.json();
    
    if(studyType === 'ALL'){
        const contentList = await db.select()
            .from(flashCardTable)
            .where(eq(flashCardTable?.courseId, courseId))
        const flashcard = contentList?.filter((item) => item.type === 'Flashcard')
        const quiz = contentList?.filter((item) => item.type === 'Quiz')
        const qa = contentList?.filter((item) => item.type === 'QA')
        const notes = await db
            .select()
            .from(chapterNotesTable)
            .where(eq(chapterNotesTable?.courseId, courseId))
        const result = {
            notes: notes,
            Flashcard: flashcard?.length > 0 ? flashcard[0] : null,
            Quiz: quiz?.length > 0 ? quiz[0] : null,
            QA: qa?.length > 0 ? qa[0] : null,
        }
        return NextResponse.json(result);
    } else if(studyType === 'notes') {
        const notes = await db
            .select()
            .from(chapterNotesTable)
            .where(eq(chapterNotesTable?.courseId, courseId))
        return NextResponse.json(notes);
    } else if(studyType === 'QA') {
        const qa = await db
            .select()
            .from(flashCardTable)
            .where(and(eq(flashCardTable?.courseId, courseId),eq(flashCardTable?.type, 'QA')))
        return NextResponse.json(qa);
    } else {
        const result = await db
            .select()
            .from(flashCardTable)
            .where(and(eq(flashCardTable?.courseId, courseId),eq(flashCardTable?.type, studyType)))
        
        // Convert the result to a plain object and ensure it's JSON serializable
        const serializedResult = result[0] ? {
            id: result[0].id,
            courseId: result[0].courseId,
            type: result[0].type,
            content: result[0].content,
            status: result[0].status
        } : null;
        
        return NextResponse.json(serializedResult);
    }
}