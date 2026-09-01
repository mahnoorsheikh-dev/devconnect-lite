import { useEffect, useState } from "react";
import * as api from "../api/client";
import useAuth from "../hooks/useAuth";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import FeedDesign from "../components/FeedDesign";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleLikeUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handleCommentUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  useEffect(() => {
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

    fetchPosts();
  }, []);

  return (
    <FeedDesign
      user={user}
      postsCount={posts.length}
      loadingPosts={loadingPosts}
      error={error}
    >
      <div className="space-y-6">
        <CreatePost
          onPostCreated={(newPost) =>
            setPosts((prev) => [newPost, ...prev])
          }
          user={user}
        />

        <PostList
          posts={posts}
          onLikeUpdate={handleLikeUpdate}
          onCommentUpdate={handleCommentUpdate}
          user={user}
        />
      </div>
    </FeedDesign>
  );
}