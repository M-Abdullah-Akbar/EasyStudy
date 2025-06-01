import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Easy Study! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to Easy Study, ${name}! 🎉</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            We're thrilled to have you join our community of learners. With Easy Study, you can:
          </p>
          <ul style="font-size: 16px; line-height: 1.6; color: #374151;">
            <li>Create AI-powered study materials</li>
            <li>Generate interactive flashcards</li>
            <li>Take quizzes to test your knowledge</li>
            <li>Access unlimited content with our premium plan</li>
          </ul>
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Get started by creating your first course or exploring our existing materials.
          </p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.HOST_URL}/dashboard" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          <p style="font-size: 14px; color: #6B7280; margin-top: 30px;">
            If you have any questions, feel free to reply to this email. We're here to help!
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return NextResponse.json(
      { error: "Failed to send welcome email" },
      { status: 500 }
    );
  }
} 