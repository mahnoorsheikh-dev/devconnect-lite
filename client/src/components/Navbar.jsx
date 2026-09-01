import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.35)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/feed" className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 transition hover:border-slate-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/30">
              DC
            </div>
            <div className="leading-none">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">App</div>
              <div className="text-sm font-bold text-white">DevConnect Lite</div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/feed" className="text-sm font-medium text-slate-200 hover:text-white">Home</Link>
            <Link to="/feed" className="text-sm font-medium text-slate-400 hover:text-slate-200">Explore</Link>
            <Link to="/feed" className="text-sm font-medium text-slate-400 hover:text-slate-200">Messages</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 md:flex">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">User</span>
            <span className="text-sm font-medium text-white">{user?.name || "Guest"}</span>
          </div>
          <Link
            to="/"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            {user ? "Profile" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
