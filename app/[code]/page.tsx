"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    setShowQR(false);
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setShortUrl(data.shortUrl);
    setLoading(false);
    setShowQR(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto w-full">
        <h1 className="text-6xl font-bold text-white mb-4">
          Short<span className="text-violet-400">ly</span>
        </h1>
        <p className="text-slate-400 text-xl mb-10">
          Shorten your links. Track every click. Beautiful analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-1 px-5 py-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-violet-500 text-lg"
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className="px-8 py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-200 text-lg"
          >
            {loading ? "Shortening..." : "Shorten →"}
          </button>
        </div>

        {shortUrl && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-slate-800 rounded-xl flex items-center justify-between gap-4">
              <a
                href={shortUrl}
                target="_blank"
                className="text-violet-400 text-lg truncate"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all"
              >
                {copied ? "✅ Copied!" : "Copy"}
              </button>
            </div>

            {showQR && (
              <div className="p-6 bg-slate-800 rounded-xl flex flex-col items-center gap-3">
                <p className="text-slate-400 text-sm">Scan QR Code</p>
                <div className="p-3 bg-white rounded-xl">
                  <QRCodeCanvas value={shortUrl} size={160} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="absolute bottom-6 text-slate-600 text-sm">
        Developed by{" "}
        <span className="text-violet-400 font-medium">Azmain Tahmid Abir</span>
      </p>
    </main>
  );
}
