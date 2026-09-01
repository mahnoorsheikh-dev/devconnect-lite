import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/feed" className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-slate-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              DC
            </div>
            <div className="leading-none">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">App</div>
              <div className="text-sm font-bold text-slate-900">DevConnect Lite</div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/feed" className="text-sm font-medium text-slate-700 hover:text-slate-900">Home</Link>
            <Link to="/feed" className="text-sm font-medium text-slate-500 hover:text-slate-800">Explore</Link>
            <Link to="/feed" className="text-sm font-medium text-slate-500 hover:text-slate-800">Messages</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">User</span>
            <span className="text-sm font-medium text-slate-800">{user?.name || "Guest"}</span>
          </div>
          <Link
            to="/"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            {user ? "Profile" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
