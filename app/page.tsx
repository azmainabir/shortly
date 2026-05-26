export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-4">
          Short<span className="text-violet-400">ly</span>
        </h1>
        <p className="text-slate-400 text-xl mb-10">
          Shorten your links. Track every click. Beautiful analytics.
        </p>

        {/* URL Input */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            className="flex-1 px-5 py-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-violet-500 text-lg"
          />
          <button className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 text-lg">
            Shorten →
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-slate-600 text-sm">
        Developed by{" "}
        <span className="text-violet-400 font-medium">Azmain Tahmid Abir</span>
      </p>
    </main>
  );
}
