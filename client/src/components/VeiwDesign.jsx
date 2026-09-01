import Navbar from "./Navbar";
import PostDetailCard from "./PostDetailCard";
import CommentThread from "./CommentThread";

export default function ViewDesign({
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
            <PostDetailCard
              post={post}
              user={user}
              loadingEditPost={loadingEditPost}
              editingPost={editingPost}
              setEditingPost={setEditingPost}
              editedContent={editedContent}
              setEditedContent={setEditedContent}
              setError={setError}
              handleEditPost={handleEditPost}
              handleDeletePost={handleDeletePost}
              handleLikePost={handleLikePost}
              loadingDeletePost={loadingDeletePost}
              likingPost={likingPost}
              isLiked={isLiked}
              likeCount={likeCount}
            />

            <CommentThread
              post={post}
              user={user}
              comment={comment}
              setComment={setComment}
              setError={setError}
              handleCommentClick={handleCommentClick}
              loadingCreateComment={loadingCreateComment}
              handleDeleteComment={handleDeleteComment}
              loadingDeleteComment={loadingDeleteComment}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              editedCommentContent={editedCommentContent}
              setEditedCommentContent={setEditedCommentContent}
              handleEditComment={handleEditComment}
            />

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
