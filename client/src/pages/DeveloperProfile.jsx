import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import * as api from '../api/client';

export default function DeveloperProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [developer, setDeveloper] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [devResult, projResult] = await Promise.all([
          api.getUserById(id),
          api.getProjectsByUser(id),
        ]);
        setDeveloper(devResult);
        setProjects(projResult || []);
        // Check if current user is already following this developer
        if (user?.id === devResult.id) {
          setIsFollowing(false);
        }
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user?.id]);

  const handleFollow = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const result = await api.followUser(id, token);
      setIsFollowing(result.isFollowing);
      // Refetch developer data to update follower count
      const updated = await api.getUserById(id);
      setDeveloper(updated);
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

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

  const isOwnProfile = user?.id === developer.id;

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

            {!isOwnProfile && (
              <button
                onClick={handleFollow}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isFollowing
                    ? 'border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'border-slate-700 bg-slate-950 text-white hover:border-indigo-500'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Followers</p>
              <p className="mt-3 text-2xl font-bold text-white">{developer.followers || 0}</p>
            </div>
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Following</p>
              <p className="mt-3 text-2xl font-bold text-white">{developer.following || 0}</p>
            </div>
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Status</p>
              <p className="mt-3 text-2xl font-bold text-white">{developer.workProgress || 0}%</p>
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

        {projects.length > 0 && (
          <div className="mt-8 rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold text-white">Projects</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <button
                  key={project._id}
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-indigo-500/40"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mb-3 h-32 w-full rounded-lg object-cover"
                    />
                  )}
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs text-slate-300">{project.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                      {project.status}
                    </span>
                    <span className="text-xs text-indigo-400">{project.likes?.length || 0}♥</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

