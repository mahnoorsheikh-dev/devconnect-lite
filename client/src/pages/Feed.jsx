import { useEffect, useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        const data = await api.getPosts(token);
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);


  const handleCreatePost = async () => {
    try {
      const token = getToken();
      const newPost = await api.createPost(content, token);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

 

  return (
    <div>
      <h1>Feed</h1>
      {(posts?.length ?? 0) === 0 ? (
        <p>No posts</p>
   ) : (
        posts.map((post) => (
           <div key={post._id}>
             <p>{post.content}</p>
           </div>
        ))
      )}

      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />

      <button onClick={handleCreatePost}>Post</button>
    </div>

  );
}


  