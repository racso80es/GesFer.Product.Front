'use client';

import { useEffect } from 'react';
import logger from '@/lib/logger';
import { Button } from '@mui/material';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registra el error usando nuestro logger centralizado (que llamará al API /api/logs)
    logger.fatal(
      {
        err: error,
        source: 'GlobalErrorHandler',
        digest: error.digest,
      },
      'Excepción global no controlada'
    );
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">¡Ups! Algo salió mal de manera inesperada.</h2>
        <p className="mb-6 text-gray-600">
          Hemos registrado este error para que nuestro equipo lo revise.
        </p>
        <Button
          variant="contained"
          onClick={() => reset()}
          color="primary"
        >
          Intentar de nuevo
        </Button>
      </body>
    </html>
  );
}
