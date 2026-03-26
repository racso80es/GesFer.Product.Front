const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/**
 * No inyectar NEXT_PUBLIC_API_URL aquí: Next.js ya carga `src/.env.local` / `.env`.
 * Inyectarlo en `env` fijaba el valor al evaluar next.config y podía dejar una URL
 * antigua (p. ej. https://localhost:5001) en el bundle aunque cambiara `.env.local`.
 * Origen efectivo: variables de entorno + `lib/api-origin.ts` + `config/api-origin-defaults.json`.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deshabilitar la optimización de vendor chunks que está causando problemas
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
  output: "standalone",
  webpack: (config) => {
    // Resolución explícita de node_modules del paquete (front aislado en src/)
    config.resolve.modules.push(__dirname + "/node_modules");
    return config;
  },
};

module.exports = withNextIntl(nextConfig);

