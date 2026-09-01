import CommentItem from "./CommentItem";

export default function CommentThread({
  post,
  user,
  comment,
  setComment,
  setError,
  handleCommentClick,
  loadingCreateComment,
  handleDeleteComment,
  loadingDeleteComment,
  editingCommentId,
  setEditingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleEditComment,
}) {
  return (
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
            <CommentItem
              key={item._id}
              item={item}
              user={user}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              editedCommentContent={editedCommentContent}
              setEditedCommentContent={setEditedCommentContent}
              setError={setError}
              handleDeleteComment={handleDeleteComment}
              loadingDeleteComment={loadingDeleteComment}
              handleEditComment={handleEditComment}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-center text-slate-400">
            No comments yet. Be the first to share your thoughts.
          </div>
        )}
      </div>
    </div>
  );
}
