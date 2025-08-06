import { NextResponse } from 'next/server'
import { writeClient } from "@/sanity/lib/write-client"
import { client } from "@/sanity/lib/client" // make sure you have this
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'

export async function POST(req: Request) {
  const { id } = await req.json()

  try {
    // Fetch current views from Sanity
    const result = await client.fetch(STARTUP_VIEWS_QUERY, { id })
    const currentViews = result?.views ?? 0

    // Update views count
    await writeClient
      .patch(id)
      .set({ views: currentViews + 1 })
      .commit()

    return NextResponse.json({ success: true, updatedViews: currentViews + 1 })
  } catch (error: any) {
  console.error('View increment failed:', error.message || error);
  return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 });
  }
}
