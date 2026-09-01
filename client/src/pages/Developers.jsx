import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import * as api from '../api/client';

export default function Developers() {
  const { user } = useAuth();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        const result = await api.getUsers();
        setDevelopers(result || []);
      } catch (err) {
        setError(err.message || 'Failed to load developers');
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-6xl px-4 py-10 text-slate-300">Loading developers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Discover</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Developers</h1>
          </div>
          <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300">
            {developers.length} profiles
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">{error}</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {developers.map((developer) => (
              <a
                key={developer.id}
                href={`/developers/${developer.id}`}
                className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)] transition hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(79,70,229,0.18)]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={developer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name || 'Dev')}&background=6366f1&color=fff&size=128`}
                    alt={developer.name}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-white">{developer.name}</h2>
                    <p className="text-sm text-slate-300">{developer.role || 'Developer'}</p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{developer.bio || 'No bio yet.'}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(developer.skills || []).slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
                  <span>{developer.location || 'Remote'}</span>
                  <span>{developer.workProgress || 0}% engaged</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
