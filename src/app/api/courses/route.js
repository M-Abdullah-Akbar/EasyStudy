import { db } from "@/db/index";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { studyMaterialTable } from "@/db/schema";


export async function POST(request) {
  const { createdBy } = await request.json();
  const result = await db
    .select()
    .from(studyMaterialTable)
    .where(eq(studyMaterialTable?.createdBy, createdBy))
    .orderBy(desc(studyMaterialTable?.id));
  return NextResponse.json({
    result: result,
  });
}

export async function GET(request) {
  const reqURL = request.url;
  const { searchParams } = new URL(reqURL);
  const courseId = searchParams.get("courseId");
  const result = await db
    .select()
    .from(studyMaterialTable)
    .where(eq(studyMaterialTable.courseId, courseId))
  return NextResponse.json({
    result: result[0],
  });
}
