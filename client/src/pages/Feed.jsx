import { useEffect, useState } from "react";
import * as api from "../api/client";
import { getToken, removeToken } from "../utils/storage";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

export default function Feed() {

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLikeUpdate = (updatedPost) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) => 
      post._id === updatedPost._id ? updatedPost : post
    )
  );
}

  useEffect(() => {
  const token = getToken();

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchUser = async () => {

    if (!token) return;
    
    try {
      const userData = await api.getUser(token);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      removeToken();
      setUser(null);
    }
  };
  fetchPosts();
  fetchUser();
}, []);

  return (
    <div>
      <h1>Feed</h1>

      {loadingPosts && <p>Loading posts...</p>}
      {error && <p className="text-red-900">{error}</p>}

      {user && <p>Welcome, {user.name}!</p>}

      <CreatePost
        onPostCreated={(newPost) =>
          setPosts((prev) => [newPost, ...prev])
        }
        user={user}
      />

      <PostList posts={posts} onLikeUpdate={handleLikeUpdate} />
    </div>
  );
}