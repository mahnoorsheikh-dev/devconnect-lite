import React, { useState, useEffect } from 'react';
import * as api from "../api/client";
import { useParams } from 'react-router-dom';

export default function PostDetails() {

const [post, setPost] = useState(null);

const {id} = useParams()

useEffect(() => {
  const fetchPost = async () => {
    try {
      const postData = await api.getPostById(id);
      setPost(postData)
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  fetchPost();
}, [id]);


  return (
    <div>
      <h2>{post?.user?.name}</h2>
      <p>{post?.content}</p>
      <p>{post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Date not available"}</p>
    </div>
  )
}