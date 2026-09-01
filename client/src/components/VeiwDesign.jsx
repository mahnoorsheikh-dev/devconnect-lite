import Navbar from "./Navbar";

export default function VeiwDesign({
  post,
  user,
  comment,
  setComment,
  error,
  setError,
  loadingCreateComment,
  loadingEditPost,
  editingPost,
  setEditingPost,
  editedContent,
  setEditedContent,
  handleCommentClick,
  handleEditPost,
  handleLikePost,
  loadingPost,
  likingPost,
  isLiked,
  likeCount,
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar user={user} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        {loadingPost ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            Loading post details...
          </div>
        ) : !post ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            Post not found.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                    {post.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{post.user?.name || "Unknown user"}</p>
                    <p className="text-sm text-slate-500">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Date not available"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                  Post
                </span>
              </div>

              <p className="whitespace-pre-wrap text-lg leading-8 text-slate-700">{post.content}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
                <button
                  onClick={handleLikePost}
                  disabled={!user || likingPost}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isLiked
                      ? "border-pink-600 bg-pink-50 text-pink-700"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {likingPost ? "Liking..." : isLiked ? "♥ Liked" : "♡ Like"}
                </button>
                <span className="text-sm text-slate-500">{likeCount} likes</span>
              </div>

              {user && user.id === post.user?._id && (
                <div className="mt-6 space-y-4 border-t border-slate-800 pt-5">
                  <button
                    onClick={() => {
                      setEditingPost(true);
                      setEditedContent(post.content);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-300"
                  >
                    Edit Post
                  </button>

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

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Comments</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{post.comments?.length || 0} total</span>
              </div>

              <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setError(null);
                  }}
                  rows={3}
                  placeholder={user ? "Write a comment..." : "Please log in to comment"}
                  disabled={!user}
                  className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleCommentClick}
                    disabled={!user || loadingCreateComment || !comment.trim()}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                  >
                    {loadingCreateComment ? "Commenting..." : "Comment"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {post.comments?.length ? (
                  post.comments.map((item) => (
                    <div key={item._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                          {item.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{item.user?.name || "Unknown"}</p>
                          <p className="text-xs text-slate-500">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-700">{item.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-slate-500">
                    No comments yet. Be the first to share your thoughts.
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
