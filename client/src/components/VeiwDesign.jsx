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
  handleDeletePost,
  handleLikePost,
  loadingPost,
  likingPost,
  isLiked,
  likeCount,
  handleDeleteComment,
  loadingDeleteComment,
  editingCommentId,
  setEditingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleEditComment,
  loadingDeletePost,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        {loadingPost ? (
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
            Loading post details...
          </div>
        ) : !post ? (
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
            Post not found.
          </div>
        ) : (
          <div className="space-y-6">
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

            <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Comments</h3>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-sm text-slate-300">{post.comments?.length || 0} total</span>
              </div>

              <div className="mb-5 rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setError(null);
                  }}
                  rows={3}
                  placeholder={user ? "Write a comment..." : "Please log in to comment"}
                  disabled={!user}
                  className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleCommentClick}
                    disabled={!user || loadingCreateComment || !comment.trim()}
                    className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    {loadingCreateComment ? "Commenting..." : "Comment"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {post.comments?.length ? (
                  post.comments.map((item) => (
                    <div key={item._id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">
                            {item.user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.user?.name || "Unknown"}</p>
                            <p className="text-xs text-slate-400">
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                            </p>
                          </div>
                        </div>

                        {user && (item.user?._id === user.id || item.user === user.id) && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingCommentId(item._id);
                                setEditedCommentContent(item.content);
                              }}
                              className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-medium text-slate-200 hover:border-indigo-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(item._id)}
                              disabled={loadingDeleteComment}
                              className="rounded-lg border border-red-500/40 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-200 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      {editingCommentId === item._id ? (
                        <div className="mt-3 space-y-3 rounded-2xl border border-slate-700 bg-slate-900 p-3">
                          <textarea
                            value={editedCommentContent}
                            onChange={(e) => {
                              setEditedCommentContent(e.target.value);
                              setError(null);
                            }}
                            rows={3}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditComment(item._id)}
                              disabled={!editedCommentContent.trim()}
                              className="rounded-xl bg-indigo-500 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditedCommentContent("");
                              }}
                              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-slate-200">{item.content}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-center text-slate-400">
                    No comments yet. Be the first to share your thoughts.
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-950/40 p-4 text-red-200">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
