import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/feed" className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold text-white">
            X
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/feed" className="text-sm font-medium text-slate-200 hover:text-white">Home</Link>
            <Link to="/feed" className="text-sm font-medium text-slate-400 hover:text-white">Explore</Link>
            <Link to="/feed" className="text-sm font-medium text-slate-400 hover:text-white">Messages</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 md:flex">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">User</span>
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
