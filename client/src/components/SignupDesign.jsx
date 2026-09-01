export default function SignupDesign({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleRegister,
  loginLink,
}) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/80 shadow-[0_30px_80px_rgba(79,70,229,0.25)] backdrop-blur-sm">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-between bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-12">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-indigo-100">
                DevConnect
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Join the community
              </h1>
              <p className="mt-4 max-w-md text-base text-indigo-100/90 md:text-lg">
                Create your developer profile, share your work, and connect with people who inspire you.
              </p>
            </div>

            <div className="mt-10 space-y-4 text-sm text-indigo-50">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">👤</div>
                <span>Build a profile that stands out</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">📬</div>
                <span>Follow projects and creators you care about</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">✨</div>
                <span>Start meaningful conversations today</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-slate-950 p-6 md:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">Sign up</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Create your account</h2>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  Create account
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account? {loginLink}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
