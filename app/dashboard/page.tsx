"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

interface LinkData {
  id: string;
  original_url: string;
  short_code: string;
  click_count: number;
  created_at: string;
}

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [linkData, setLinkData] = useState<LinkData | null>(null);

  const handleLookup = async () => {
    setError("");
    setLinkData(null);

    if (!input.trim()) {
      setError("Please paste a short link first.");
      return;
    }

    const code = input.trim().split("/").filter(Boolean).pop() || "";

    setLoading(true);
    const { data, error: dbError } = await supabase
      .from("links")
      .select("id, original_url, short_code, click_count, created_at")
      .eq("short_code", code)
      .single();
    setLoading(false);

    if (dbError || !data) {
      setError("No link found. Please check the short link and try again.");
      return;
    }

    setLinkData(data as LinkData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-slate-400 hover:text-violet-400 text-sm font-medium transition-colors"
        >
          ← Back to Shortly
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Short<span className="text-violet-400">ly</span> Analytics
          </h1>
          <p className="text-slate-400">
            Paste any short link to see its click analytics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your short link here..."
            className="flex-1 px-5 py-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-violet-500 text-lg"
          />
          <button
            onClick={handleLookup}
            disabled={loading}
            className="px-8 py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-200 text-lg"
          >
            {loading ? "Looking up..." : "Check"}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-5 py-4 mb-6">
            {error}
          </div>
        )}

        {linkData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Total Clicks</p>
                <p className="text-4xl font-bold text-violet-400">
                  {linkData.click_count || 0}
                </p>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Created On</p>
                <p className="text-xl font-bold text-white">
                  {new Date(linkData.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Short Code</p>
              <p className="text-violet-400 font-mono text-lg mb-4">
                /{linkData.short_code}
              </p>
              <p className="text-slate-400 text-sm mb-2">Original URL</p>
              <p className="text-slate-300 text-sm break-all">
                {linkData.original_url}
              </p>
            </div>
          </div>
        )}

        <p className="text-center text-slate-600 text-sm mt-10">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/azmain-abir"
            target="_blank"
            className="text-violet-400 hover:underline"
          >
            Azmain Tahmid Abir
          </a>
        </p>
      </div>
    </main>
  );
}
