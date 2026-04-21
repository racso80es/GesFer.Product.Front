"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { AdaptiveDataCard } from "@/components/ui/adaptive-data-card";
import { SmartInput } from "@/components/ui/smart-input";
import { Button } from "@/components/ui/button";
import { Building2, User, Lock, Loader2, AlertCircle } from "lucide-react";
import { useTranslations } from 'next-intl';

function getDefaultLoginCredentials(): { company: string; username: string; password: string } {
  return {
    company: process.env.NEXT_PUBLIC_DEFAULT_LOGIN_COMPANY ?? "Empresa Demo",
    username: process.env.NEXT_PUBLIC_DEFAULT_LOGIN_USER ?? "admin",
    password: process.env.NEXT_PUBLIC_DEFAULT_LOGIN_PASSWORD ?? "admin123",
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const t = useTranslations('auth');
  const [formData, setFormData] = useState<{ company: string; username: string; password: string }>(() => getDefaultLoginCredentials());
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forceShowForm, setForceShowForm] = useState(false);

  useEffect(() => {
    if (authLoading) {
      const timeoutId = setTimeout(() => {
        setForceShowForm(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    } else {
      setForceShowForm(false);
    }
  }, [authLoading]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && !isLoading) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (currentPath.includes('login') && !currentPath.includes('dashboard')) {
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const callbackUrl = params?.get('callbackUrl');
        const target = callbackUrl && callbackUrl.startsWith('/') && !callbackUrl.startsWith('//') ? callbackUrl : '/dashboard';
        router.replace(target);
      }
    }
  }, [authLoading, isAuthenticated, isLoading, router]);

  if (authLoading && !forceShowForm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!authLoading && isAuthenticated && !isLoading) {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    if (currentPath.includes('login')) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
           <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(formData);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t('loginError')
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background font-bold shadow-subtle mb-4">
            G
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Acceder a GesFer</h1>
          <p className="text-sm text-muted-foreground mt-1">Ingresa tus credenciales para continuar</p>
        </div>

        <AdaptiveDataCard asForm>
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-sm font-medium text-foreground">
                {t('company')}
              </label>
              <SmartInput
                id="company"
                type="text"
                placeholder={t('company')}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                icon={<Building2 className="h-4 w-4" />}
                required
                data-testid="login-company-input"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                {t('username')}
              </label>
              <SmartInput
                id="username"
                type="text"
                placeholder={t('username')}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                icon={<User className="h-4 w-4" />}
                required
                data-testid="login-username-input"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                {t('password')}
              </label>
              <SmartInput
                id="password"
                type="password"
                placeholder={t('password')}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                icon={<Lock className="h-4 w-4" />}
                required
                data-testid="login-password-input"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20" data-testid="login-error-message">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6 shadow-subtle"
              disabled={isLoading}
              data-testid="login-submit-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('login')}...
                </>
              ) : (
                t('login')
              )}
            </Button>
          </form>
        </AdaptiveDataCard>
      </div>
    </div>
  );
}
