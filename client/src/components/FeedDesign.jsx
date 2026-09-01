import Navbar from "./Navbar";

export default function FeedDesign({ user, postsCount, loadingPosts, error, children }) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <header className="mb-8 rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.7)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 font-bold text-white shadow-lg shadow-indigo-500/30">
                D
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">DevConnect</p>
                <h1 className="text-xl font-bold text-white md:text-2xl">Developer Feed</h1>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "G"}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Active</p>
                <p className="text-sm font-medium text-white">{user?.name || "Guest"}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Profile</p>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-300">
                  {user ? "Online" : "Guest"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "G"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{user?.name || "Guest User"}</p>
                  <p className="text-sm text-slate-400">Developer</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Posts</p>
                  <p className="mt-2 text-2xl font-bold text-white">{postsCount}</p>
                </div>
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Focus</p>
                  <p className="mt-2 text-sm font-medium text-indigo-200">Frontend • Backend • Community</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            {loadingPosts && (
              <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 text-slate-300 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                Loading posts...
              </div>
            )}

            {error && (
              <div className="rounded-[28px] border border-red-700/50 bg-red-950/40 p-4 text-red-200 shadow-[0_20px_50px_rgba(127,29,29,0.25)]">
                {error}
              </div>
            )}

            {children}
          </main>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Trending</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                <li className="rounded-2xl bg-slate-950 px-3 py-2.5">#React</li>
                <li className="rounded-2xl bg-slate-950 px-3 py-2.5">#NodeJS</li>
                <li className="rounded-2xl bg-slate-950 px-3 py-2.5">#AI</li>
                <li className="rounded-2xl bg-slate-950 px-3 py-2.5">#CareerGrowth</li>
              </ul>
            </div>

            <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Check</p>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                  <span>Mentions</span>
                  <span className="font-semibold text-white">24</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                  <span>Messages</span>
                  <span className="font-semibold text-white">12</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                  <span>Followers</span>
                  <span className="font-semibold text-white">890</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
