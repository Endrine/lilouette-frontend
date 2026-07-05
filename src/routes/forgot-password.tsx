import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiForgotPassword } from "@/lib/api";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — Lilouette" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await apiForgotPassword(email);
    setLoading(false);
    setSent(true);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{t.forgotPassword.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl">{t.forgotPassword.title}</h1>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
            {t.forgotPassword.subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border/60 p-8 shadow-[var(--shadow-soft)]">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.forgotPassword.sent}
              </p>
              <Link to="/login" className="text-sm text-accent hover:underline underline-offset-4">
                {t.forgotPassword.backToSignIn}
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <label className="block">
                <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{t.forgotPassword.email}</span>
                <input
                  required type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="auth-input"
                />
              </label>

              <button
                type="submit" disabled={loading}
                className="w-full rounded-full bg-foreground text-background py-3 text-sm tracking-wide transition-all hover:bg-accent hover:shadow-[var(--shadow-soft)] disabled:opacity-60"
              >
                {loading ? t.forgotPassword.submitting : t.forgotPassword.submit}
              </button>

              <p className="text-sm text-muted-foreground text-center">
                <Link to="/login" className="hover:text-accent underline underline-offset-4 transition-colors">
                  {t.forgotPassword.backToSignIn}
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`.auth-input{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.625rem;padding:.7rem .9rem;font-size:.9rem;color:var(--foreground);outline:none;transition:border-color .2s,box-shadow .2s}.auth-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in oklab,var(--accent) 18%,transparent)}`}</style>
    </SiteLayout>
  );
}
