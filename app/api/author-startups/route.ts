import { parseServerActionResponse } from "@/functions";
import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { NextResponse } from "next/server";

export async function GET (req: Response) {
    const { id } = await req.json();

    if (!id)  return parseServerActionResponse({error: "Not Document id is missing", status: "ERROR"});

    try {
        const posts = await  client.fetch(STARTUP_BY_ID_QUERY, { id });
        if (!posts) return parseServerActionResponse({error: "Not signed in", status: "ERROR"});

        return NextResponse.json({posts, success: true})
    } catch (error: any) {
        console.error("Startups fetch failed:", error.message || error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}