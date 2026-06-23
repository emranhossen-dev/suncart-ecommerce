import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("[CLIENT DEBUG LOG]:", JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false });
    }
}
