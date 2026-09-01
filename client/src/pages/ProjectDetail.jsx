import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import * as api from '../api/client';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const result = await api.getProjectById(id);
        setProject(result);
        setIsLiked(result.likes?.includes(user?.id) || false);
      } catch (err) {
        setError(err.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user?.id]);

  const handleLike = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const updated = await api.likeProject(id, token);
      setProject(updated);
      setIsLiked(updated.likes?.includes(user?.id) || false);
    } catch (err) {
      console.error('Error liking project:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.deleteProject(id, token);
      navigate('/projects');
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-5xl px-4 py-10 text-slate-300">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">{error || 'Project not found'}</div>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === project.creator?._id;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <button
          onClick={() => navigate('/projects')}
          className="mb-6 text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to projects
        </button>

        <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="mb-6 h-96 w-full rounded-2xl object-cover"
            />
          )}

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Project</p>
              <h1 className="mt-2 text-4xl font-bold text-white">{project.title}</h1>
              <p className="mt-2 text-slate-300">
                Status: <span className="font-semibold capitalize text-indigo-400">{project.status}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLike}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isLiked
                    ? 'border-red-500 bg-red-500/20 text-red-300 hover:bg-red-500/30'
                    : 'border-slate-700 bg-slate-950 text-white hover:border-red-500'
                }`}
              >
                {isLiked ? '♥' : '♡'} {project.likes?.length || 0}
              </button>

              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="rounded-full border border-red-500/50 bg-red-950/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-500 hover:bg-red-950/50"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="text-xl font-semibold text-white">About This Project</h2>
            <p className="mt-4 text-base leading-7 text-slate-200">{project.description}</p>

            {project.link && (
              <div className="mt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-500 bg-indigo-600/20 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-600/40"
                >
                  Visit Project →
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Created By</p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={
                    project.creator?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(project.creator?.name || 'Dev')}&background=6366f1&color=fff&size=48`
                  }
                  alt={project.creator?.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{project.creator?.name}</p>
                  <p className="text-xs text-slate-400">{project.creator?.role || 'Developer'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-200"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No tags</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
