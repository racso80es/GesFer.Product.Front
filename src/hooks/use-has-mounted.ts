"use client";

import { useEffect, useState } from "react";

/**
 * Indica cuándo el componente ya se ha montado en el cliente.
 * El primer render (servidor y primer frame del cliente) es siempre `false`,
 * lo que permite alinear el HTML con el SSR antes de leer localStorage u otras APIs solo de navegador.
 *
 * @see SddIA/norms/nextjs-hydration-client-state.md
 */
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
