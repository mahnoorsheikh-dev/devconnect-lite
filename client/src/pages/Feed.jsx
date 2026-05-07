import { useEffect, useState } from "react";
import * as api from "../api/client";
import { getToken, removeToken } from "../utils/storage";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import { useNavigate } from "react-router-dom";

export default function Feed() {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const token = getToken();

  if (!token) {
    removeToken();
    navigate("/");
    return;
  }

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await api.getPosts(token);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchUser = async () => {
    try {
      const userData = await api.getUser(token);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      removeToken();
      setUser(null);
      navigate("/");
    }
  };

  fetchPosts();
  fetchUser();
}, [navigate]);

  return (
    <div>
      <h1>Feed</h1>

      {loadingPosts && <p>Loading posts...</p>}
      {error && <p className="text-danger">{error}</p>}

      {user && <p>Welcome, {user.name}!</p>}

      <CreatePost
        onPostCreated={(newPost) =>
          setPosts((prev) => [newPost, ...prev])
        }
      />

      <PostList posts={posts} />
    </div>
  );
}