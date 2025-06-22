import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { checkNewUser, generateNotes, generateStudyTypeContent } from "../../../inngest/functions";

// Create an API that serves Inngest functions
const handler = serve({
  client: inngest,
  functions: [
    checkNewUser,
    generateNotes,
    generateStudyTypeContent
  ],
});

export const { GET, POST, PUT } = handler;
