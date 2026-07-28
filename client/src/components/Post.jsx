import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../api/client";


export default function Post ({ post, onLikeUpdate, user }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  

  const handlePostClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLikeClick = () => {
    const token = localStorage.getItem("token");
    api.likePost(post._id, token)
      .then((updatedPost) => {
        onLikeUpdate(updatedPost);
      })
      .catch(() => {
        setError("Failed to like post");
      });
  };

  const isLiked = user && post.likes?.includes(user.id);

  return (
    <div>
        <p>{post.content} - {post.user.name}</p>
        <p>Likes: {post.likes.length}</p>

        <button
          className="bg-blue-800 text-amber-50"
          onClick={handlePostClick}
          disabled={!user}
        >
          {
            user
            ? "View Details"
            : "Please log in to view details"
          }
          
        </button>
        <button
            className="bg-green-800 text-amber-50"
            onClick={handleLikeClick}
            disabled={!user}
          >  {
            user
              ? isLiked
                ? "Unlike"
                : "Like"
              : "Please log in to like"
              }
          </button>
    

          {error && <p className="text-red-900">{error}</p>}
    </div>
  );
}


  