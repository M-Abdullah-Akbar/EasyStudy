import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
//import { helloWorld } from "../../../inngest/functions";
import { checkNewUser, generateNotes, generateStudyTypeContent } from "../../../inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    //helloWorld,
    checkNewUser,
    generateNotes,
    generateStudyTypeContent
  ],
  middleware: [
    async ({ request, next }) => {
      try {
        // Only try to parse JSON for POST and PUT requests
        if (request.method === 'POST' || request.method === 'PUT') {
          const body = await request.text();
          if (body) {
            try {
              JSON.parse(body);
            } catch (e) {
              console.error('Invalid JSON body:', e);
              return new Response('Invalid JSON body', { status: 400 });
            }
          }
        }
        return next();
      } catch (error) {
        console.error('Middleware error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }
  ]
});
