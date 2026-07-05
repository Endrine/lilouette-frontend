import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { apiResetPassword } from "@/lib/api";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — Lilouette" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useSearch() as { token?: string };
  const { t } = useT();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = password === confirm;
  const passwordValid = password.length >= 8 && /\d/.test(password);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!passwordValid || !passwordsMatch || !token) return;
    setError(null);
    setLoading(true);
    try {
      await apiResetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-6 py-28 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-8">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="font-display text-4xl mb-4">{t.resetPassword.invalid}</h1>
          <Link to="/forgot-password" className="text-sm underline underline-offset-4 hover:text-accent transition-colors">
            {t.forgotPassword.submit}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  if (done) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-6 py-28 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-8">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-display text-4xl mb-4">{t.resetPassword.successTitle}</h1>
          <p className="text-muted-foreground mb-8">{t.resetPassword.successMsg}</p>
          <Link to="/login" className="text-sm underline underline-offset-4 hover:text-accent transition-colors">
            {t.forgotPassword.backToSignIn}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{t.resetPassword.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl">{t.resetPassword.title}</h1>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl bg-card border border-border/60 p-8 shadow-[var(--shadow-soft)] space-y-5">
          <label className="block">
            <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{t.resetPassword.newPassword}</span>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="auth-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {password.length > 0 && !passwordValid && (
              <p className="mt-1.5 text-xs text-muted-foreground">{t.account.passwordRule}</p>
            )}
          </label>

          <label className="block">
            <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{t.resetPassword.confirm}</span>
            <input
              required
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className={`auth-input ${confirm && !passwordsMatch ? "border-destructive" : ""}`}
            />
            {confirm && !passwordsMatch && (
              <p className="mt-1.5 text-xs text-destructive">{t.resetPassword.noMatch}</p>
            )}
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading || !passwordValid || !passwordsMatch}
            className="w-full rounded-full bg-foreground text-background py-3 text-sm tracking-wide transition-all hover:bg-accent hover:shadow-[var(--shadow-soft)] disabled:opacity-60"
          >
            {loading ? t.resetPassword.submitting : t.resetPassword.submit}
          </button>

          <p className="text-sm text-muted-foreground text-center">
            <Link to="/login" className="hover:text-accent underline underline-offset-4 transition-colors">
              {t.forgotPassword.backToSignIn}
            </Link>
          </p>
        </form>
      </div>

      <style>{`.auth-input{width:100%;background:var(--background);border:1px solid var(--border);border-radius:.625rem;padding:.7rem .9rem;font-size:.9rem;color:var(--foreground);outline:none;transition:border-color .2s,box-shadow .2s}.auth-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in oklab,var(--accent) 18%,transparent)}`}</style>
    </SiteLayout>
  );
}
