import { useEffect, useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

export default function Feed() {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        const data = await api.getPosts(token);
        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
        <CreatePost onPostCreated={(newPost) =>
          setPosts((prev) => [newPost, ...prev])}
        />
        <PostList posts={posts} />
    </div>

  );
}


  