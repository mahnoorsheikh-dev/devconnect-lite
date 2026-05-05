import { useEffect, useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";

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
      {(posts?.length ?? 0) === 0 ? (
        <p>No posts</p>
   ) : (
        posts.map((post) => (
           <div key={post._id}>
             <p>{post.content}</p>
           </div>
        ))
      )}
    </div>
  );
}


  