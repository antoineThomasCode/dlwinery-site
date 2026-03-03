import { NextRequest, NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { error: "Newsletter service is not available. Please try again later." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    // listIds can be added later when a specific list is created in Brevo
    const payload: Record<string, unknown> = {
      email,
      attributes: {
        SUBSCRIPTION_SOURCE: "website_footer",
      },
      updateEnabled: true, // If contact already exists, update instead of error
    };

    // Add to specific list if BREVO_NEWSLETTER_LIST_ID is configured
    const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
    if (listId) {
      payload.listIds = [parseInt(listId, 10)];
    }

    const response = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 201) {
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact (Brevo returns 400 with "Contact already exist")
    if (response.status === 400) {
      const errorData = await response.json().catch(() => null);
      if (errorData?.message?.toLowerCase().includes("already exist")) {
        // Contact already exists — treat as success
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      console.error("Brevo contacts API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Could not subscribe. Please try again." },
        { status: 400 }
      );
    }

    const errorData = await response.json().catch(() => null);
    console.error("Brevo contacts API error:", response.status, errorData);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
