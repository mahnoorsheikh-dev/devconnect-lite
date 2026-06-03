import React, { useState, useEffect } from 'react';
import * as api from "../api/client";
import { useParams } from 'react-router-dom';

export default function PostDetails() {

const [post, setPost] = useState(null);
const [comment, setComment] = useState("");


const {id} = useParams()

const handleCommentClick = () => {
    const token = localStorage.getItem("token");
    if (!comment || !comment.trim()) return;
    api.commentPost(post._id, comment, token)
      .then((updatedPost) => {
        setPost(updatedPost);
        setComment("");
      })
      .catch((error) => {
        console.error("Error commenting on post:", error);
      });
  };

useEffect(() => {
  const fetchPost = async () => {
    try {
      const postData = await api.getPostById(id);
      setPost(postData);
      
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
      <p>{post?.createdAt ? 
      new Date(post.createdAt).toLocaleDateString() : 
      "Date not available"}</p>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {post?.comments?.map((comments) => {
          return (
            <div key={comments._id}>
              <p>{comments.user.name}</p>
              <p>{comments.content}</p>
            </div>
          );
        })}

        <button
         onClick={handleCommentClick}>
          Comment
        </button>
</div>

    </div>
  )
}