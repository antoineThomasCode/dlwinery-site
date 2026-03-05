import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  verifyAdminAuth,
  adminKeyNotConfiguredResponse,
  unauthorizedResponse,
} from "@/lib/admin-auth";

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

export async function GET(request: NextRequest) {
  // Auth check
  if (!process.env.ADMIN_API_KEY) {
    return adminKeyNotConfiguredResponse();
  }
  if (!verifyAdminAuth(request)) {
    return unauthorizedResponse();
  }

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
