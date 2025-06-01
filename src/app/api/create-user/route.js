import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { user } = await request.json();
    const result = await inngest.send({
        name: "user.check",
        data: {
            user:user
        }
    });
    return NextResponse.json({ result: result });
}