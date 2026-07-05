import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Lilouette" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{t.login.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl">{t.login.title}</h1>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl bg-card border border-border/60 p-8 shadow-[var(--shadow-soft)] space-y-5">
          <Field label={t.login.email}>
            <input
              required type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="auth-input"
            />
          </Field>
          <Field label={t.login.password}>
            <div className="relative">
              <input
                required type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="auth-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-accent transition-colors underline underline-offset-4">
              {t.login.forgot}
            </Link>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full rounded-full bg-foreground text-background py-3 text-sm tracking-wide transition-all hover:bg-accent hover:shadow-[var(--shadow-soft)] disabled:opacity-60"
          >
            {loading ? t.login.submitting : t.login.submit}
          </button>

          <p className="text-sm text-muted-foreground text-center">
            {t.login.noAccount}{" "}
            <Link to="/register" className="text-foreground hover:text-accent underline underline-offset-4 transition-colors">
              {t.login.register}
            </Link>
          </p>
        </form>
      </div>

      <style>{`.auth-input{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.625rem;padding:.7rem .9rem;font-size:.9rem;color:var(--foreground);outline:none;transition:border-color .2s,box-shadow .2s}.auth-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in oklab,var(--accent) 18%,transparent)}`}</style>
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