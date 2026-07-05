import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { apiVerifyEmail } from "@/lib/api";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify email — Lilouette" }] }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { token: searchToken } = Route.useSearch() as { token?: string };
  const { persist } = useAuth();
  const navigate = useNavigate();
  const { t } = useT();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!searchToken) { setStatus("error"); setErrorMsg(t.verifyEmail.noToken); return; }
    apiVerifyEmail(searchToken)
      .then((res) => {
        persist(res.access_token, res.user);
        setStatus("success");
        setTimeout(() => navigate({ to: "/" }), 2500);
      })
      .catch((err) => {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Verification failed");
      });
  }, []);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-6 py-28 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto mb-6" />
            <p className="text-muted-foreground">{t.verifyEmail.verifying}</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-8">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-display text-4xl mb-4">{t.verifyEmail.successTitle}</h1>
            <p className="text-muted-foreground">{t.verifyEmail.successMsg}</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-8">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="font-display text-4xl mb-4">{t.verifyEmail.errorTitle}</h1>
            <p className="text-muted-foreground mb-8">{errorMsg}</p>
            <Link to="/register" className="text-sm underline underline-offset-4 hover:text-accent transition-colors">
              {t.verifyEmail.createAccount}
            </Link>
          </>
        )}
      </div>
    </SiteLayout>
  );
}
