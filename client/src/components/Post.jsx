import { useNavigate } from "react-router-dom";
import * as api from "../api/client";


export default function Post ({ post, onLikeUpdate }) {
  const navigate = useNavigate();

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
         like the post
        </button>


      </div>
  );
}
      