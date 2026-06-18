import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Instagram } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lilouette" },
      { name: "description", content: "Get in touch with Lilouette for custom pieces, questions, or to say hello." },
      { property: "og:title", content: "Contact — Lilouette" },
      { property: "og:description", content: "Send Lilouette a note or find us on Instagram." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24 grid md:grid-cols-2 gap-14 items-start">
        <div className="space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-accent">Say hello</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">Let's talk soon.</h1>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Questions about a piece, a custom order, or just want to say hi? Send us a note — we read every one.
          </p>
          <a
            href="https://www.instagram.com/lilouette.co/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm transition-all hover:border-accent hover:text-accent"
          >
            <Instagram className="h-4 w-4" />
            DM us @lilouette.co
          </a>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl bg-card border border-border/60 p-8 shadow-[var(--shadow-soft)] space-y-5">
          <Field label="Your name">
            <input required name="name" type="text" className="field-input" placeholder="Lilou Bonnet" />
          </Field>
          <Field label="Email">
            <input required name="email" type="email" className="field-input" placeholder="you@example.com" />
          </Field>
          <Field label="Message">
            <textarea required name="message" rows={5} className="field-input resize-none" placeholder="Tell us a little..." />
          </Field>
          <button
            type="submit"
            className="w-full rounded-full bg-foreground text-background py-3 text-sm tracking-wide transition-all hover:bg-accent hover:shadow-[var(--shadow-soft)]"
          >
            Send message
          </button>
          {sent && (
            <p className="text-sm text-accent text-center pt-1">Thank you — your note is on its way ✿</p>
          )}
        </form>
      </section>

      <style>{`
        .field-input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 0.625rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent);
        }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}