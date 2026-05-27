import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const shortCode = nanoid(6);

  const { error } = await supabase
    .from("links")
    .insert([{ original_url: url, short_code: shortCode }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`;

  return NextResponse.json({ shortUrl, shortCode });
}
