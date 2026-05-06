import React, { useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";


export default function CreatePost({ onPostCreated }) {

  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    try {
      const token = getToken();
      if (!content.trim())return; 
      const newPost = await api.createPost(content, token);
      onPostCreated(newPost);
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);

    }
  };

  return (
    <div>
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