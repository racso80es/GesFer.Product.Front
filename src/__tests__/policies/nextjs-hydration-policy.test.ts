import fs from "fs";
import path from "path";

/**
 * Política genérica: la norma y el hook canónicos sobre hidratación deben seguir presentes.
 * Evita borrar documentación o el contrato sin actualizar ProtectedRoute / nuevos patrones.
 *
 * @see SddIA/norms/nextjs-hydration-client-state.md
 */
describe("Política hidratación Next.js (SSR / cliente)", () => {
  const repoRoot = path.join(__dirname, "..", "..", "..");
  const normPath = path.join(repoRoot, "SddIA", "norms", "nextjs-hydration-client-state.md");
  const hookPath = path.join(
    __dirname,
    "..",
    "..",
    "hooks",
    "use-has-mounted.ts"
  );
  const protectedRoutePath = path.join(
    __dirname,
    "..",
    "..",
    "components",
    "auth",
    "protected-route.tsx"
  );

  it("existe la norma SddIA y menciona localStorage y useHasMounted", () => {
    expect(fs.existsSync(normPath)).toBe(true);
    const md = fs.readFileSync(normPath, "utf8");
    expect(md).toMatch(/localStorage/i);
    expect(md).toMatch(/useHasMounted|hasMounted/);
    expect(md).toMatch(/useSyncExternalStore|getServerSnapshot/);
  });

  it("existe el hook useHasMounted y exporta la función esperada", () => {
    expect(fs.existsSync(hookPath)).toBe(true);
    const src = fs.readFileSync(hookPath, "utf8");
    expect(src).toMatch(/export function useHasMounted/);
    expect(src).toMatch(/useState\(false\)/);
  });

  it("ProtectedRoute usa useHasMounted para alinear lectura de storage con el SSR", () => {
    expect(fs.existsSync(protectedRoutePath)).toBe(true);
    const src = fs.readFileSync(protectedRoutePath, "utf8");
    expect(src).toMatch(/useHasMounted/);
    expect(src).toMatch(/hasMounted \? readStoredAuthUser/);
  });
});
