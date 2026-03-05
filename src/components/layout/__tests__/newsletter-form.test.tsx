import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "../newsletter-form";

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders input and subscribe button", () => {
    render(<NewsletterForm />);
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i })
    ).toBeInTheDocument();
  });

  it("shows success message on successful submit", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<NewsletterForm />);
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "test@example.com"
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/subscribed/i)).toBeInTheDocument();
    });
  });

  it("shows error message on API error", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Could not subscribe." }),
    });

    render(<NewsletterForm />);
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "test@example.com"
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText("Could not subscribe.")).toBeInTheDocument();
    });
  });

  it("shows generic error on network failure", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error")
    );

    render(<NewsletterForm />);
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "test@example.com"
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("shows loading state while submitting", async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: unknown) => void;
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    render(<NewsletterForm />);
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "test@example.com"
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByText(/subscribing/i)).toBeInTheDocument();

    // Clean up the pending promise
    resolvePromise!({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });

  it("clears error when user types", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Bad request" }),
    });

    render(<NewsletterForm />);
    const input = screen.getByPlaceholderText("Your email");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText("Bad request")).toBeInTheDocument();
    });

    // Start typing again — error should clear
    await user.type(input, "x");
    expect(screen.queryByText("Bad request")).not.toBeInTheDocument();
  });
});
