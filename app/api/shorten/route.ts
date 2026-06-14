import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabase } from "../../../lib/supabase";

function normalizeUrl(input: string): string | null {
  let value = input.trim();
  if (!value) return null;

  // Add https:// if no protocol is present
  if (!/^https?:\/\//i.test(value)) {
    value = "https://" + value;
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  // Only allow http and https
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }

  // Hostname must look like a real domain: contain a dot, be localhost, or an IP
  const hostname = parsed.hostname;
  const looksLikeDomain =
    hostname === "localhost" ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) ||
    hostname.includes(".");

  if (!looksLikeDomain) {
    return null;
  }

  return parsed.toString();
}

export async function POST(request: Request) {
  let body: { url?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawUrl = body?.url;

  if (!rawUrl || typeof rawUrl !== "string") {
    return NextResponse.json(
      { error: "Please provide a URL." },
      { status: 400 }
    );
  }

  const normalizedUrl = normalizeUrl(rawUrl);

  if (!normalizedUrl) {
    return NextResponse.json(
      { error: "Please enter a valid URL (e.g. https://example.com)." },
      { status: 400 }
    );
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://shortly-gilt-eight.vercel.app";

  // Try inserting, retry with a new code if the short_code collides
  for (let attempt = 0; attempt < 5; attempt++) {
    const shortCode = nanoid(6);

    const { error } = await supabase.from("links").insert({
      original_url: normalizedUrl,
      short_code: shortCode,
    });

    if (!error) {
      return NextResponse.json({ shortUrl: `${appUrl}/${shortCode}` });
    }

    // 23505 = Postgres unique constraint violation -> retry with new code
    if (error.code === "23505") {
      continue;
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: "Could not generate a unique short link. Please try again." },
    { status: 500 }
  );
}
