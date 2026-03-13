import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
  budget: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // In production: send via nodemailer / Resend / SendGrid
    // For now, log to server and return success
    console.log("📬 New contact form submission:", {
      from: `${data.name} <${data.email}>`,
      subject: data.subject,
      budget: data.budget ?? "Not specified",
      message: data.message,
    });

    // Simulate slight delay
    await new Promise((r) => setTimeout(r, 300));

    return NextResponse.json(
      { success: true, message: "Message received! I'll be in touch soon." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
