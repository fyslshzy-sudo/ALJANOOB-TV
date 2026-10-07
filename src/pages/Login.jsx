import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { safeReturnTo } from '@/lib/authReturnTo';

export default function Login() {
  const { navigateToLogin } = useAuth();
  
  React.useEffect(() => {
    // Automatically trigger SDK login flow
    navigateToLogin();
  }, [navigateToLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-6 bg-card rounded-xl border border-border text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">جاري تحويلك إلى صفحة تسجيل الدخول الآمنة...</p>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2, Tv, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { safeReturnTo } from "@/lib/authReturnTo";

const EDITOR_PASSWORD = "janoob2026";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (password === EDITOR_PASSWORD) {
      localStorage.setItem("janoob_editor_auth", "true");
      window.location.href = returnTo;
    } else {
      setError("   ");
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={Tv}
      title=" "
      subtitle="      "
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoFocus
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 h-12 text-right"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
               ...
            </>
          ) : (
            ""
          )}
        </Button>
      </form>

      <Link
        to="/"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
          
      </Link>
    </AuthLayout>
  );
    }
