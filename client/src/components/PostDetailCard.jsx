export default function PostDetailCard({
  post,
  user,
  loadingEditPost,
  editingPost,
  setEditingPost,
  editedContent,
  setEditedContent,
  setError,
  handleEditPost,
  handleDeletePost,
  handleLikePost,
  loadingDeletePost,
  likingPost,
  isLiked,
  likeCount,
}) {
  return (
    <div className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-sky-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
            {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-white">{post.user?.name || "Unknown user"}</p>
            <p className="text-sm text-slate-400">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Date not available"}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
          Post
        </span>
      </div>

      <p className="whitespace-pre-wrap text-lg leading-8 text-slate-200">{post.content}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-5">
        <button
          onClick={handleLikePost}
          disabled={!user || likingPost}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            isLiked
              ? "border-pink-500 bg-pink-500/10 text-pink-300"
              : "border-slate-700 bg-slate-950 text-slate-200 hover:border-pink-500 hover:text-pink-300"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {likingPost ? "Liking..." : isLiked ? "♥ Liked" : "♡ Like"}
        </button>
        <span className="text-sm text-slate-400">{likeCount} likes</span>
      </div>

      {user && user.id === post.user?._id && (
        <div className="mt-6 space-y-4 border-t border-slate-800 pt-5">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setEditingPost(true);
                setEditedContent(post.content);
              }}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-300"
            >
              Edit Post
            </button>
            <button
              onClick={handleDeletePost}
              disabled={loadingDeletePost}
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:border-red-400 hover:text-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingDeletePost ? "Deleting..." : "Delete Post"}
            </button>
          </div>

          {editingPost && (
            <div className="space-y-3 rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <textarea
                value={editedContent}
                onChange={(e) => {
                  setEditedContent(e.target.value);
                  setError(null);
                }}
                rows={4}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                placeholder="Edit post content"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleEditPost}
                  disabled={loadingEditPost || !editedContent.trim()}
                  className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                >
                  {loadingEditPost ? "Saving..." : "Save Edit"}
                </button>
                <button
                  onClick={() => {
                    setEditingPost(false);
                    setEditedContent(post.content);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
