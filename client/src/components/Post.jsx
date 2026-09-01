import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../api/client";

export default function Post({ post, onLikeUpdate, user }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLiking, setIsLiking] = useState(false);

  const handlePostClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLikeClick = () => {
    if (!user || isLiking) return;

    const token = localStorage.getItem("token");
    setIsLiking(true);
    setError(null);

    api.likePost(post._id, token)
      .then((updatedPost) => {
        onLikeUpdate(updatedPost);
      })
      .catch(() => {
        setError("Failed to like post");
      })
      .finally(() => {
        setIsLiking(false);
      });
  };

  const isLiked = user && post.likes?.includes(user.id);

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.45)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-500 font-bold text-white">
            {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-white">{post.user?.name || "Unknown user"}</p>
            <p className="text-xs text-slate-400">Developer</p>
          </div>
        </div>

        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-200">
          Post
        </span>
      </div>

      <p className="whitespace-pre-wrap text-base leading-7 text-slate-200">{post.content}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="rounded-full bg-slate-800 px-2.5 py-1">♥ {post.likes?.length || 0}</span>
        </div>

        <div className="flex gap-3">
          <button
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handlePostClick}
            disabled={!user}
          >
            {user ? "View details" : "Please log in to view details"}
          </button>

          <button
            className="rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            onClick={handleLikeClick}
            disabled={!user || isLiking}
          >
            {user
              ? isLiking
                ? "Liking..."
                : isLiked
                  ? "Unlike"
                  : "Like"
              : "Please log in to like"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </article>
  );
}
