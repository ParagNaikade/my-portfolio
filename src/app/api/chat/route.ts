import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("Received message:", message);

    // Return a static response since the AWS backend is currently unavailable
    return NextResponse.json({
      reply:
        "I'm currently offline as my backend is being updated. Please reach out via the contact form instead!",
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
