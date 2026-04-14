import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from "@/i18n";

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
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
