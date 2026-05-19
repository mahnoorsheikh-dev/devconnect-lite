import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../api/client";


export default function Post ({ post, onLikeUpdate, onCommentUpdate, user }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handlePostClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLikeClick = () => {
    const token = localStorage.getItem("token");
    api.likePost(post._id, token)
      .then((updatedPost) => {
        onLikeUpdate(updatedPost);
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  }

  const isLiked = user && post.likes?.includes(user.id);
  
  const handleCommentClick = () => {
    const token = localStorage.getItem("token");
    api.commentPost(post._id, comment, token)
      .then((updatedPost) => {
        onCommentUpdate(updatedPost);
        setComment("");
      })
      .catch((error) => {
        console.error("Error commenting on post:", error);
      });
  }




  return (
    <div>
        <p>{post.content} - {post.user.name}</p>
        <p>Likes: {post.likes.length}</p>

        <button
            className="bg-blue-800 text-amber-50"
            onClick={handlePostClick}>
         View Details
        </button>

        <button 
         onClick={handleLikeClick}>
          {isLiked ? "Unlike" : "Like"}
        </button>

<div className="mt-2">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <p>Comments: {post.comments.length} - {post.comments[0]?.content}</p>
        <button
         onClick={handleCommentClick}>
          Comment
        </button>
</div>
    </div>
  );
}
