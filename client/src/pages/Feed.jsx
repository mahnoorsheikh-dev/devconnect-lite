import { useEffect, useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

export default function Feed() {

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setError(null);
      try {
        const token = getToken();
        setLoadingPosts(true);
        const data = await api.getPosts(token);
        setPosts(data);
      } catch (err) {
        setError(`Failed to fetch posts: ${err.message}`);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {loadingPosts && <p>Loading posts...</p>}
      {error && <p className="text-danger">{error}</p>}
        <CreatePost onPostCreated={(newPost) =>
          setPosts((prev) => [newPost, ...prev])}
        />
        <PostList posts={posts} />
    </div>

  );
}


  