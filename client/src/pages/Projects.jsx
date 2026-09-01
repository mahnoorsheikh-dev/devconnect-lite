import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import * as api from '../api/client';

export default function Projects() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const result = await api.getProjects();
        setProjects(result || []);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-6xl px-4 py-10 text-slate-300">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Explore</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Projects</h1>
          </div>
          {user && (
            <button
              onClick={() => navigate('/create-project')}
              className="rounded-full border border-indigo-500 bg-indigo-600 px-5 py-2 font-medium text-white transition hover:border-indigo-400 hover:bg-indigo-700"
            >
              + New Project
            </button>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">{error}</div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-300">No projects yet. Be the first to showcase your work!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <button
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)] transition hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(79,70,229,0.18)] text-left"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="mb-4 h-40 w-full rounded-2xl object-cover"
                  />
                )}

                <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{project.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {(project.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-xs font-medium text-indigo-400">{project.likes?.length || 0}♥</span>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-slate-800 pt-3">
                  <img
                    src={
                      project.creator?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(project.creator?.name || 'Dev')}&background=6366f1&color=fff&size=32`
                    }
                    alt={project.creator?.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-xs text-slate-300">{project.creator?.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
