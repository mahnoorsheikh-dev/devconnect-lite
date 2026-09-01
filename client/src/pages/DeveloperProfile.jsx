import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import * as api from '../api/client';

export default function DeveloperProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        setLoading(true);
        const result = await api.getUserById(id);
        setDeveloper(result);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-5xl px-4 py-10 text-slate-300">Loading developer profile...</div>
      </div>
    );
  }

  if (error || !developer) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">
            {error || 'Developer not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={developer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name || 'Dev')}&background=6366f1&color=fff&size=128`}
                alt={developer.name}
                className="h-20 w-20 rounded-3xl object-cover ring-2 ring-indigo-500/40"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Profile</p>
                <h1 className="mt-2 text-3xl font-bold text-white">{developer.name}</h1>
                <p className="mt-1 text-slate-300">{developer.role || 'Developer'} • {developer.location || 'Remote'}</p>
              </div>
            </div>

            <button className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-300">
              Connect
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Status</p>
              <p className="mt-3 text-2xl font-bold text-white">{developer.workProgress || 0}%</p>
            </div>
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Location</p>
              <p className="mt-3 text-2xl font-bold text-white">{developer.location || 'Remote'}</p>
            </div>
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Member</p>
              <p className="mt-3 text-2xl font-bold text-white">{developer.createdAt ? new Date(developer.createdAt).toLocaleDateString() : 'New'}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold text-white">About</h2>
            <p className="mt-4 text-base leading-7 text-slate-200">{developer.bio || 'This developer has not added a bio yet.'}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(developer.skills || []).map((skill) => (
                <span key={skill} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold text-white">Highlights</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                <span>Role</span>
                <span className="font-semibold text-white">{developer.role || 'Developer'}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                <span>Location</span>
                <span className="font-semibold text-white">{developer.location || 'Remote'}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                <span>Progress</span>
                <span className="font-semibold text-white">{developer.workProgress || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
