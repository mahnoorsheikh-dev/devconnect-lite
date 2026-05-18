import PostDetails from "../pages/PostDetails";
import { useNavigate } from "react-router-dom";


export default function Post ({ post }) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div>
        <p>{post.content} - {post.user.name}</p>

        <button
            className="bg-blue-800 text-amber-50"
            onClick={handlePostClick}>
         View Details
        </button>


      </div>
  );
}
      