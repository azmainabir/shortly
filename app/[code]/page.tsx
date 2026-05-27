import { redirect } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const { data } = await supabase
    .from("links")
    .select("original_url")
    .eq("short_code", code)
    .single();

  if (!data) {
    redirect("/");
  }

  redirect(data.original_url);
}
