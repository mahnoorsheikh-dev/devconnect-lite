import React, { useState } from "react";
import * as api from "../api/client";
import { getToken } from "../utils/storage";


export default function CreatePost({ onPostCreated, user }) {

  const [content, setContent] = useState("");
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePost = async () => {

      if (!content.trim()) return; 
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
        placeholder={
          user
          ? "What's on your mind?"
          : "Please log in to create a post"
        }
        disabled={!user}
      />
      <button 
       onClick={handleCreatePost}
       disabled={!user || loadingCreatePost || !content.trim()}>
        {loadingCreatePost ? "Posting..." : "Post"}
      </button>
      {error && <p className="text-red-900">{error}</p>}
    </div>
  );
} 
