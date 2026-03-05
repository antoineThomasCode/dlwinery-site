// TODO: Add authentication middleware (e.g., API key check, session-based auth)
// This endpoint is currently unprotected — MVP only, do NOT expose publicly without auth.

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "club-leads.json");

type ClubLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: string;
  timestamp: string;
  completedSignup: boolean;
};

export async function GET() {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    const leads: ClubLead[] = JSON.parse(data);

    // Sort by timestamp descending (most recent first)
    leads.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ leads, total: leads.length });
  } catch {
    // File doesn't exist yet or is invalid — return empty array
    return NextResponse.json({ leads: [], total: 0 });
  }
}
