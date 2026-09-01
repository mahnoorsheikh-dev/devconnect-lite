import React, { useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";


export default function CreatePost({ onPostCreated, user }) {

  const [content, setContent] = useState("");
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePost = async () => {

      if (!content.trim()) return; 
      const token = getToken();
      if (!token) {
        setError("No token found. User might not be authenticated.");
        return;
      }

      setLoadingCreatePost(true);
      setError(null);
      try {
      const newPost = await api.createPost(content, token);
      onPostCreated(newPost);
      setContent("");
    } catch (error) {
      setError(`Failed to create post: ${error.message}`);
    } finally {
      setLoadingCreatePost(false);
    }
  };

  return (
    <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "G"}
        </div>
        <div>
          <p className="font-medium text-white">{user?.name || "Guest"}</p>
          <p className="text-xs text-slate-400">Share something with the community</p>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError(null);
        }}
        placeholder={
          user
            ? "What's on your mind?"
            : "Please log in to create a post"
        }
        disabled={!user}
        rows={4}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-sm text-slate-400">
          {user ? "Ready to post" : "Login required"}
        </div>

        <button
          onClick={handleCreatePost}
          disabled={!user || loadingCreatePost || !content.trim()}
          className="rounded-2xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {loadingCreatePost ? "Posting..." : "Post"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
} 
