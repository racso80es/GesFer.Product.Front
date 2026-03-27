import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { OverlayFix } from "@/components/ui/overlay-fix";
import { locales } from "@/i18n";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "GesFer - Gestión de Chatarra",
  description: "Sistema de gestión de compra/venta de chatarra",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validar que el locale sea válido
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Cargar mensajes para el locale específico
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={roboto.variable}>
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <OverlayFix />
            <Toaster richColors position="top-center" />
            <NextIntlClientProvider locale={locale} messages={messages}>
              <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
              </QueryProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

