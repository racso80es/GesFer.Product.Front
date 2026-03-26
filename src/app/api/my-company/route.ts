import { NextRequest, NextResponse } from "next/server";
import { Company } from "@/lib/types/api";
import { getProductApi } from "@/lib/api/product-api";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  try {
    const api = getProductApi();
    const company = await api.get<Company>("/mycompany", {
      headers: auth ? { Authorization: auth } : {},
    });

    if (!company) {
      return NextResponse.json(
        { error: "Organización no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("Unauthorized") || msg.includes("401")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    console.error("Error fetching my company:", error);
    return NextResponse.json(
      { error: "Error al obtener la organización" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = request.headers.get("authorization");
  try {
    const body = await request.json();
    const api = getProductApi();
    const company = await api.put<Company>("/mycompany", body, {
      headers: auth ? { Authorization: auth } : {},
    });
    return NextResponse.json(company);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("Unauthorized") || msg.includes("401")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    console.error("Error updating my company:", error);
    return NextResponse.json(
      { error: "Error al actualizar la organización" },
      { status: 500 }
    );
  }
}
