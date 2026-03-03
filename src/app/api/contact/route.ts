import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const SUBJECT_LABELS: Record<string, string> = {
  tasting: "Tasting Reservation",
  "wine-club": "Wine Club Inquiry",
  "private-event": "Private Event",
  "wine-order": "Wine Order / Shipping",
  press: "Press / Media",
  other: "Other",
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later or call us directly." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
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

    const subjectLabel = SUBJECT_LABELS[subject] || subject;

    const htmlContent = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #26321B;">
        <div style="border-bottom: 2px solid #D7A45E; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="font-size: 22px; color: #26321B; margin: 0;">New Contact Form Message</h1>
          <p style="color: #D7A45E; font-size: 13px; margin: 4px 0 0 0;">via dlwinery.com</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 12px; background: #f8f6f0; border: 1px solid #e8e4da; font-weight: bold; width: 120px; font-size: 14px;">Name</td>
            <td style="padding: 10px 12px; border: 1px solid #e8e4da; font-size: 14px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background: #f8f6f0; border: 1px solid #e8e4da; font-weight: bold; font-size: 14px;">Email</td>
            <td style="padding: 10px 12px; border: 1px solid #e8e4da; font-size: 14px;">
              <a href="mailto:${escapeHtml(email)}" style="color: #26321B;">${escapeHtml(email)}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 10px 12px; background: #f8f6f0; border: 1px solid #e8e4da; font-weight: bold; font-size: 14px;">Phone</td>
            <td style="padding: 10px 12px; border: 1px solid #e8e4da; font-size: 14px;">
              <a href="tel:${escapeHtml(phone)}" style="color: #26321B;">${escapeHtml(phone)}</a>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 10px 12px; background: #f8f6f0; border: 1px solid #e8e4da; font-weight: bold; font-size: 14px;">Subject</td>
            <td style="padding: 10px 12px; border: 1px solid #e8e4da; font-size: 14px;">${escapeHtml(subjectLabel)}</td>
          </tr>
        </table>

        <div style="background: #f8f6f0; border: 1px solid #e8e4da; padding: 16px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #26321B;">Message</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <p style="font-size: 11px; color: #999; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8e4da;">
          This message was sent from the contact form on dlwinery.com
        </p>
      </div>
    `;

    const textContent = `New Contact Form Message — dlwinery.com\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\nSubject: ${subjectLabel}\n\nMessage:\n${message}`;

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "DL Winery Website",
          email: "noreply@dlwinery.cohorte.tech",
        },
        to: [
          {
            email: "info@dlwinery.com",
            name: "Domaine LeSeurre",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `[Website] ${subjectLabel} — ${name}`,
        htmlContent,
        textContent,
        tags: ["website-contact-form"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Brevo API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Failed to send message. Please try again or call us directly at (607) 569-3299." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or call us directly at (607) 569-3299." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
