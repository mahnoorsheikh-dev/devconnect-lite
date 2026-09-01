export default function FeedDesign({ user, postsCount, loadingPosts, error, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <header className="mb-8 rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.7)] backdrop-blur-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Community</p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Developer Feed</h1>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "G"}
              </div>
              <div>
                <p className="text-sm text-slate-400">Signed in as</p>
                <p className="font-medium text-white">{user?.name || "Guest"}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Overview</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">Posts</p>
                  <p className="mt-1 text-2xl font-bold text-white">{postsCount}</p>
                </div>
                <div className="rounded-2xl bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-400">
                    {user ? "Online" : "Guest mode"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Trending</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li className="rounded-xl bg-slate-950 px-3 py-2">#React</li>
                <li className="rounded-xl bg-slate-950 px-3 py-2">#NodeJS</li>
                <li className="rounded-xl bg-slate-950 px-3 py-2">#AI</li>
                <li className="rounded-xl bg-slate-950 px-3 py-2">#CareerGrowth</li>
              </ul>
            </div>
          </aside>

          <main className="space-y-6">
            {loadingPosts && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-300">
                Loading posts...
              </div>
            )}

            {error && (
              <div className="rounded-3xl border border-red-700/50 bg-red-950/40 p-4 text-red-200">
                {error}
              </div>
            )}

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
