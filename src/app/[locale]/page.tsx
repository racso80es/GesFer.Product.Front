"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations('common');

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading size="lg" text={t('loading')} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10">
      {/* Navbar Minimalista (Vercel Style: Bottom border only, flat white) */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder - Monochrome */}
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-bold shadow-subtle">
            G
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">GesFer</span>
        </div>
        <nav>
          {isAuthenticated ? (
            <Button onClick={() => router.push("/dashboard")} variant="outline" className="text-foreground border-border hover:bg-secondary">
              Ir al Dashboard
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} variant="default" className="shadow-subtle">
              Iniciar Sesión
            </Button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="block text-primary">Gestión Integral</span>
            <span className="block text-muted-foreground">de Compra y Venta de Chatarra</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl font-medium">
            GesFer es la plataforma líder diseñada específicamente para optimizar, administrar y escalar tus operaciones en el sector de la recuperación y reciclaje de metales.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isAuthenticated ? (
              <Button onClick={() => router.push("/dashboard")} size="lg" className="w-full sm:w-auto px-8 shadow-subtle">
                Acceder a mi panel
              </Button>
            ) : (
              <Button onClick={() => router.push("/login")} size="lg" className="w-full sm:w-auto px-8 shadow-subtle">
                Acceder al Sistema
              </Button>
            )}

            {!isAuthenticated && (
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 bg-background border-border text-foreground hover:bg-secondary" onClick={() => window.open('#', '_self')}>
                Más Información
              </Button>
            )}
          </div>
        </div>

        {/* Feature Highlights - Precise Grid */}
        <div className="mx-auto mt-24 max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-3 border-t border-border pt-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary text-foreground mb-4 shadow-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Control Financiero</h3>
            <p className="mt-2 text-sm text-muted-foreground font-medium">Supervisa compras, ventas y márgenes con herramientas diseñadas para el mercado.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary text-foreground mb-4 shadow-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Gestión de Proveedores</h3>
            <p className="mt-2 text-sm text-muted-foreground font-medium">Administra eficazmente la relación con tus proveedores, autónomos y empresas.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary text-foreground mb-4 shadow-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2-9 5 18 2-9h5"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Reportes en Tiempo Real</h3>
            <p className="mt-2 text-sm text-muted-foreground font-medium">Obtén métricas clave y toma decisiones informadas con tableros interactivos.</p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-auto py-8 text-center text-sm text-muted-foreground border-t border-border mt-16">
        <p className="font-medium">&copy; {new Date().getFullYear()} GesFer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
