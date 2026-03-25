"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loading } from "@/TemporalShared/Front/components/ui/loading";
import { Button } from "@/TemporalShared/Front/components/ui/button";
import { useTranslations } from 'next-intl';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations('common');

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading size="lg" text={t('loading')} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* TODO: [FRONT-HOME] - Implementar estructura de Hero Section y botón de acceso. Referencia: Requisito de acceso rápido al Login. */}

      {/* Navbar Minimalista */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
            G
          </div>
          <span className="text-xl font-bold text-slate-800">GesFer</span>
        </div>
        <nav>
          {isAuthenticated ? (
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Ir al Dashboard
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} variant="default">
              Iniciar Sesión
            </Button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block text-blue-600">Gestión Integral</span>
            <span className="block">de Compra y Venta de Chatarra</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 sm:text-xl">
            GesFer es la plataforma líder diseñada específicamente para optimizar, administrar y escalar tus operaciones en el sector de la recuperación y reciclaje de metales.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isAuthenticated ? (
              <Button onClick={() => router.push("/dashboard")} size="lg" className="w-full sm:w-auto px-8">
                Acceder a mi panel
              </Button>
            ) : (
              <Button onClick={() => router.push("/login")} size="lg" className="w-full sm:w-auto px-8">
                Acceder al Sistema
              </Button>
            )}

            {!isAuthenticated && (
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8" onClick={() => window.open('#', '_self')}>
                Más Información
              </Button>
            )}
          </div>
        </div>

        {/* Feature Highlights (Optional Visuals) */}
        <div className="mx-auto mt-20 max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-3 border-t border-slate-200 pt-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Control Financiero</h3>
            <p className="mt-2 text-slate-500">Supervisa compras, ventas y márgenes con herramientas diseñadas para el mercado.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Gestión de Proveedores</h3>
            <p className="mt-2 text-slate-500">Administra eficazmente la relación con tus proveedores, autónomos y empresas.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2-9 5 18 2-9h5"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Reportes en Tiempo Real</h3>
            <p className="mt-2 text-slate-500">Obtén métricas clave y toma decisiones informadas con tableros interactivos.</p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} GesFer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}





