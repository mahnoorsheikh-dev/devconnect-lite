export default function CommentItem({
  item,
  user,
  editingCommentId,
  setEditingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  setError,
  handleDeleteComment,
  loadingDeleteComment,
  handleEditComment,
}) {
  const isOwner = user && (item.user?._id === user.id || item.user === user.id);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
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

        {isOwner && (
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
  );
}
