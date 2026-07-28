import React, { useState, useEffect } from 'react';
import * as api from "../api/client";
import { useParams } from 'react-router-dom';

export default function PostDetails({user}) {

const [post, setPost] = useState(null);
const [comment, setComment] = useState("");
const [error, setError] = useState(null);
const [loadingCreateComment, setLoadingCreateComment] = useState(false);
const [editingPost, setEditingPost] = useState(false);
const [editedContent, setEditedContent] = useState("");
const [loadingEditPost, setLoadingEditPost] = useState(false);



const {id} = useParams()

const handleCommentClick = () => {
  const token = localStorage.getItem("token");

  if (!comment || !comment.trim()) return;

  setLoadingCreateComment(true);

  api.commentPost(post._id, comment, token)
    .then((updatedPost) => {
      setPost(updatedPost);
      setComment("");
    })
    .catch(() => {
      setError("Failed to add comment");
    })
    .finally(() => {
      setLoadingCreateComment(false);
    });
};

const handleEditPost = () => {
  const token = localStorage.getItem("token");
  if (!editedContent || !editedContent.trim()) return;

  setLoadingEditPost(true);
  api.updatePost(post._id, editedContent, token)
    .then((updatedPost) => {
      setPost(updatedPost);
      setEditingPost(false);
      setEditedContent("");
      
    }
    )
    .catch(() => {
      setError("Failed to edit post");
    })
    .finally(() => {
      setLoadingEditPost(false);
    });
};



useEffect(() => {
  const fetchPost = async () => {
    try {
      const postData = await api.getPostById(id);
      setPost(postData);
      setLoadingCreateComment(false);
    } catch {
      setError("Failed to fetch post details");
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
          value={comment}
          onChange={(e) => {
          setComment(e.target.value);
          setError(null);
        }}
        placeholder={
          user
          ? "Add a comment"
          : "Please log in to comment"
        }
        disabled={!user}
      />

        {post?.comments?.map((comments) => {
          return (
            <div key={comments._id}>
              <p>{comments?.user?.name}</p>
              <p>{comments.content}</p>
            </div>
          );
        })}

        <button
         onClick={handleCommentClick}
         disabled={!user || loadingCreateComment || !comment.trim()}
         >
        {loadingCreateComment ? "commenting..." : "Comment"}
        </button>

        <button
          onClick={() => {
            setEditingPost(true);
            setEditedContent(post.content);
          }}
          disabled={!user || user._id !== post?.user?._id}
        >
          Edit Post
        </button>

        <input
          type="text"
          value={editedContent}
          onChange={(e) => {
            setEditedContent(e.target.value);
            setError(null);
          }}
          placeholder="Edit post content"
          disabled={!editingPost}
        />

        <button
          onClick={() => setEditingPost(false)}
          disabled={!editingPost}
        >
          Cancel Edit
        </button>
        <button
          onClick={handleEditPost}
          disabled={!editingPost || loadingEditPost || !editedContent.trim()}
        >
          {loadingEditPost ? "Saving..." : "Save Edit"}
        </button>

        {error && <p className="text-red-900">{error}</p>}
</div>

    </div>
  )
}