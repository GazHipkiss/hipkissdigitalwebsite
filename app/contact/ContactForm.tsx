"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLInputElement)?.value?.trim() || undefined,
      budget: (form.elements.namedItem("budget") as HTMLInputElement)?.value?.trim() || undefined,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-border bg-surface-panel p-8 text-center">
        <p className="text-lg font-medium text-foreground">Thanks for your message.</p>
        <p className="mt-2 text-muted">I’ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200" placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-foreground">Service (optional)</label>
        <input id="service" name="service" type="text" className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200" placeholder="e.g. Web app, Marketing site" />
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-foreground">Budget (optional)</label>
        <input id="budget" name="budget" type="text" className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200" placeholder="e.g. £5k–10k" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
        <textarea id="message" name="message" rows={5} required className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200" placeholder="Tell me about your project, timeline, and budget if you have one in mind." />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full py-3">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
