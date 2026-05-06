import React, { useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";


export default function CreatePost({ onPostCreated }) {

  const [content, setContent] = useState("");
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePost = async () => {

      if (!content.trim())return; 
      const token = getToken();
      if (!token) {
        setError("No token found. User might not be authenticated.");
        return;
      }

      setLoadingCreatePost(true);
      setError(null);
      try {
      const newPost = await api.createPost(content, token);
      onPostCreated(newPost);
      setContent("");
    } catch (error) {
      setError(`Failed to create post: ${error.message}`);
    } finally {
      setLoadingCreatePost(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError(null);
        }}
        placeholder="What's on your mind?"
      />

      <button onClick={handleCreatePost} disabled={loadingCreatePost || !content.trim()}>
        {loadingCreatePost ? "Posting..." : "Post"}
      </button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}