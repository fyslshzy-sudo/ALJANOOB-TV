import React from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function ForgotPassword() {
  const { navigateToLogin } = useAuth();

  React.useEffect(() => {
    navigateToLogin();
  }, [navigateToLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-6 bg-card rounded-xl border border-border text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">جاري تحويلك لاستعادة كلمة المرور...</p>
      </div>
    </div>
  );
}
