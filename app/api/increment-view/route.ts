// app/api/increment-view/route.ts
import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import "server-only";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
  }

  try {
    const result = await client.fetch(STARTUP_VIEWS_QUERY, { id });
    const currentViews = result?.views ?? 0;

    await writeClient
      .patch(id)
      .set({ views: currentViews + 1 })
      .commit();

    return NextResponse.json({ success: true, updatedViews: currentViews + 1 });
  } catch (error: any) {
    console.error("View increment failed:", error.message || error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}