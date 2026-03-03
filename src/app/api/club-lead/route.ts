import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "club-leads.json");

const VINOSHIPPER_CLUB_URL =
  "https://vinoshipper.com/shop/domaine_leseurre_winery/join-our-club";

type ClubLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: string;
  timestamp: string;
  completedSignup: boolean;
};

async function readLeads(): Promise<ClubLead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLeads(leads: ClubLead[]): Promise<void> {
  const dir = path.dirname(LEADS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, source } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const lead: ClubLead = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      source: source || "wine-club-page",
      timestamp: new Date().toISOString(),
      completedSignup: false,
    };

    // Save lead locally
    const leads = await readLeads();

    // Check for existing lead by email — update if exists
    const existingIndex = leads.findIndex(
      (l) => l.email === lead.email
    );
    if (existingIndex >= 0) {
      leads[existingIndex] = { ...leads[existingIndex], ...lead };
    } else {
      leads.push(lead);
    }

    await writeLeads(leads);

    // Optionally push to Brevo if configured
    const brevoKey = process.env.BREVO_API_KEY;
    if (brevoKey) {
      try {
        await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "api-key": brevoKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: lead.email,
            attributes: {
              FIRSTNAME: lead.firstName,
              LASTNAME: lead.lastName,
              SMS: lead.phone || "",
              SUBSCRIPTION_SOURCE: "wine_club_lead",
            },
            updateEnabled: true,
            ...(process.env.BREVO_CLUB_LEAD_LIST_ID
              ? { listIds: [parseInt(process.env.BREVO_CLUB_LEAD_LIST_ID, 10)] }
              : {}),
          }),
        });
      } catch {
        // Brevo push is best-effort — don't fail the request
        console.error("Failed to push club lead to Brevo");
      }
    }

    return NextResponse.json({
      success: true,
      redirectUrl: VINOSHIPPER_CLUB_URL,
    });
  } catch (error) {
    console.error("Club lead capture error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple endpoint to check lead count (useful for admin later)
  try {
    const leads = await readLeads();
    return NextResponse.json({ count: leads.length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
