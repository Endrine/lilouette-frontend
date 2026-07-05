import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "FAQs — Lilouette" }] }),
  component: FAQsPage,
});


function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-display text-xl group-hover:text-accent transition-colors">{q}</span>
        <span className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <p className="pb-6 text-muted-foreground leading-relaxed text-[0.95rem]">{a}</p>
      )}
    </div>
  );
}

function FAQsPage() {
  const { t } = useT();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="mb-14 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">{t.faqs.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl">{t.faqs.title}</h1>
        </div>
        <div>
          {t.faqs.items.map((item) => (
            <Accordion key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
        <p className="mt-14 text-center text-sm text-muted-foreground">
          {t.faqs.stillQuestion}{" "}
          <a href="/contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
            {t.faqs.getInTouch}
          </a>
        </p>
      </div>
    </SiteLayout>
  );
}
