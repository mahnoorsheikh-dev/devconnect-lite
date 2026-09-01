import Navbar from "./Navbar";

export default function FeedDesign({ user, postsCount, loadingPosts, error, children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar user={user} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Profile</p>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {user ? "Online" : "Guest"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "G"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">{user?.name || "Guest User"}</p>
                  <p className="text-sm text-slate-500">Developer</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-100 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Posts</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{postsCount}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Focus</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">Frontend • Backend • Community</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            {loadingPosts && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
                Loading posts...
              </div>
            )}

            {error && (
              <div className="rounded-[28px] border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
                {error}
              </div>
            )}

            {children}
          </main>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Trending</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="rounded-2xl bg-slate-100 px-3 py-2.5">#React</li>
                <li className="rounded-2xl bg-slate-100 px-3 py-2.5">#NodeJS</li>
                <li className="rounded-2xl bg-slate-100 px-3 py-2.5">#AI</li>
                <li className="rounded-2xl bg-slate-100 px-3 py-2.5">#CareerGrowth</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Quick Check</p>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-3 py-2">
                  <span>Mentions</span>
                  <span className="font-semibold text-slate-900">24</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-3 py-2">
                  <span>Messages</span>
                  <span className="font-semibold text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-3 py-2">
                  <span>Followers</span>
                  <span className="font-semibold text-slate-900">890</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
