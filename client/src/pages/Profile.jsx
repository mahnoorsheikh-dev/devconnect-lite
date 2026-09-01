import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import * as api from "../api/client";
import { getToken } from "../utils/storage";

function StatCard({ label, value, tone = "indigo" }) {
  const tones = {
    indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200",
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    sky: "border-sky-500/30 bg-sky-500/10 text-sky-200",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.indigo}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function PostPreviewCard({ post }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.32)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-500 text-sm font-semibold text-white">
            {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-white">{post.user?.name || "You"}</p>
            <p className="text-xs text-slate-400">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300">
          {post.likes?.length || 0} likes
        </span>
      </div>

      <p className="whitespace-pre-wrap text-base leading-7 text-slate-200">{post.content}</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-sm text-slate-400">
        <span>{post.comments?.length || 0} comments</span>
        <span>{post.likes?.length || 0} reactions</span>
      </div>
    </article>
  );
}

const defaultProfile = (user) => ({
  avatar: user?.avatar || "",
  bio: user?.bio || "I build thoughtful digital experiences and help teams turn ideas into polished products.",
  role: user?.role || "Full-Stack Developer",
  location: user?.location || "Remote",
  workProgress: user?.workProgress ?? 72,
  skills: user?.skills?.length ? user.skills : ["React", "Node.js", "MongoDB", "UI Design"],
});

export default function Profile() {
  const { user, loading, setUser } = useAuth();
  const [profile, setProfile] = useState(defaultProfile(user));
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile(defaultProfile(user));
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    let active = true;

    const fetchUserPosts = async () => {
      try {
        setLoadingPosts(true);
        setError("");

        const allPosts = await api.getPosts();
        const myPosts = allPosts.filter((post) => {
          const authorId = post.user?._id || post.user;
          return String(authorId) === String(user.id);
        });

        if (active) {
          setPosts(myPosts);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load your posts.");
        }
      } finally {
        if (active) {
          setLoadingPosts(false);
        }
      }
    };

    fetchUserPosts();

    return () => {
      active = false;
    };
  }, [user]);

  const stats = useMemo(() => {
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);

    return {
      posts: posts.length,
      likes: totalLikes,
      comments: totalComments,
    };
  }, [posts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    const token = getToken();
    if (!token) return;

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...profile,
        workProgress: Number(profile.workProgress) || 0,
      };

      const updatedUser = await api.updateProfile(payload, token);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Unable to save profile information.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4 text-slate-300">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const avatarUrl =
    profile.avatar && profile.avatar.trim()
      ? profile.avatar
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=6366f1&color=fff&size=128`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl}
                alt={user.name}
                className="h-20 w-20 rounded-3xl object-cover ring-2 ring-indigo-500/40"
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Developer profile</p>
                <h1 className="mt-2 text-3xl font-bold text-white">{user.name}</h1>
                <p className="mt-1 text-slate-300">{profile.role} • {profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
                {user.createdAt ? `Joined ${new Date(user.createdAt).toLocaleDateString()}` : "Member"}
              </div>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-300"
              >
                {isEditing ? "Close" : "Edit profile"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Posts" value={stats.posts} tone="indigo" />
            <StatCard label="Likes" value={stats.likes} tone="violet" />
            <StatCard label="Comments" value={stats.comments} tone="sky" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">About</h2>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {profile.role}
                </span>
              </div>

              {isEditing ? (
                <div className="mt-5 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-slate-300">
                      <span className="mb-2 block">Profile image URL</span>
                      <input
                        name="avatar"
                        value={profile.avatar}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </label>

                    <label className="text-sm text-slate-300">
                      <span className="mb-2 block">Role</span>
                      <input
                        name="role"
                        value={profile.role}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </label>

                    <label className="text-sm text-slate-300">
                      <span className="mb-2 block">Location</span>
                      <input
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </label>

                    <label className="text-sm text-slate-300">
                      <span className="mb-2 block">Work progress (%)</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="workProgress"
                        value={profile.workProgress}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="block text-sm text-slate-300">
                    <span className="mb-2 block">About</span>
                    <textarea
                      name="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </label>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                    >
                      {saving ? "Saving..." : "Save profile"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <p className="text-base leading-7 text-slate-200">{profile.bio}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Recent activity</h2>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
                  {stats.posts} posts
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {loadingPosts ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-300">
                    Loading your posts...
                  </div>
                ) : error ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">{error}</div>
                ) : posts.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-center text-slate-400">
                    You have not posted anything yet.
                  </div>
                ) : (
                  posts.map((post) => <PostPreviewCard key={post._id} post={post} />)
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Work progress</p>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Current milestone</span>
                  <span className="font-semibold text-white">{profile.workProgress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-sky-500"
                    style={{ width: `${profile.workProgress}%` }}
                  />
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                    <span>Posts</span>
                    <span className="font-semibold text-white">{stats.posts}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                    <span>Comments</span>
                    <span className="font-semibold text-white">{stats.comments}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-3 py-2">
                    <span>Engagement</span>
                    <span className="font-semibold text-white">{stats.likes}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Quick actions</p>
              <div className="mt-5 space-y-3">
                <a
                  href="/feed"
                  className="block rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-center text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-300"
                >
                  Back to feed
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
