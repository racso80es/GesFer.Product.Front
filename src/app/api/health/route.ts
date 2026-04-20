import { NextResponse } from "next/server";

/** Salud del dev/prod server para herramientas (start-frontend) sin depender de i18n ni middleware de rewrite. */
export function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
