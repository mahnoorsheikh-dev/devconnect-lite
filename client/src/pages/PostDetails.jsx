import React, { useState, useEffect } from 'react';
import * as api from "../api/client";
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../utils/storage.js';
import useAuth from '../hooks/useAuth';
import VeiwDesign from '../components/VeiwDesign';

export default function PostDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [loadingCreateComment, setLoadingCreateComment] = useState(false);
  const [editingPost, setEditingPost] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [loadingEditPost, setLoadingEditPost] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [likingPost, setLikingPost] = useState(false);
  const [loadingDeletePost, setLoadingDeletePost] = useState(false);
  const [loadingDeleteComment, setLoadingDeleteComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");

  const fetchPost = async () => {
    try {
      setLoadingPost(true);
      const postData = await api.getPostById(id);
      setPost(postData);
    } catch {
      setError("Failed to fetch post details");
    } finally {
      setLoadingPost(false);
    }
  };

  const handleCommentClick = () => {
    const token = getToken();
    if (!comment || !comment.trim() || !post) return;

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
    const token = getToken();
    if (!editedContent || !editedContent.trim() || !post) return;

    setLoadingEditPost(true);
    api.updatePost(post._id, editedContent, token)
      .then((updatedPost) => {
        setPost(updatedPost);
        setEditingPost(false);
        setEditedContent("");
      })
      .catch(() => {
        setError("Failed to edit post");
      })
      .finally(() => {
        setLoadingEditPost(false);
      });
  };

  const handleDeletePost = () => {
    const token = getToken();
    if (!post) return;

    setLoadingDeletePost(true);
    api.deletePost(post._id, token)
      .then(() => {
        navigate('/feed');
      })
      .catch(() => {
        setError("Failed to delete post");
      })
      .finally(() => {
        setLoadingDeletePost(false);
      });
  };

  const handleLikePost = () => {
    if (!user || !post || likingPost) return;

    const token = getToken();
    setLikingPost(true);
    setError(null);

    api.likePost(post._id, token)
      .then((updatedPost) => {
        setPost(updatedPost);
      })
      .catch(() => {
        setError("Failed to like post");
      })
      .finally(() => {
        setLikingPost(false);
      });
  };

  const handleDeleteComment = (commentId) => {
    const token = getToken();
    if (!post || !commentId) return;

    setLoadingDeleteComment(true);
    api.deleteCommentPost(post._id, commentId, token)
      .then(() => {
        setPost((prev) => ({
          ...prev,
          comments: (prev?.comments || []).filter((item) => item._id !== commentId),
        }));
      })
      .catch(() => {
        setError("Failed to delete comment");
      })
      .finally(() => {
        setLoadingDeleteComment(false);
      });
  };

  const handleEditComment = (commentId) => {
    const token = getToken();
    if (!post || !commentId || !editedCommentContent.trim()) return;

    api.updateCommentPost(post._id, commentId, editedCommentContent, token)
      .then((updatedPost) => {
        setPost(updatedPost);
        setEditingCommentId(null);
        setEditedCommentContent("");
      })
      .catch(() => {
        setError("Failed to edit comment");
      });
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <VeiwDesign
      post={post}
      user={user}
      comment={comment}
      setComment={setComment}
      error={error}
      setError={setError}
      loadingCreateComment={loadingCreateComment}
      loadingEditPost={loadingEditPost}
      editingPost={editingPost}
      setEditingPost={setEditingPost}
      editedContent={editedContent}
      setEditedContent={setEditedContent}
      handleCommentClick={handleCommentClick}
      handleEditPost={handleEditPost}
      handleDeletePost={handleDeletePost}
      handleLikePost={handleLikePost}
      loadingPost={loadingPost}
      likingPost={likingPost}
      isLiked={!!user && !!post && post.likes?.includes(user.id || user._id)}
      likeCount={post?.likes?.length || 0}
      handleDeleteComment={handleDeleteComment}
      loadingDeleteComment={loadingDeleteComment}
      editingCommentId={editingCommentId}
      setEditingCommentId={setEditingCommentId}
      editedCommentContent={editedCommentContent}
      setEditedCommentContent={setEditedCommentContent}
      handleEditComment={handleEditComment}
      loadingDeletePost={loadingDeletePost}
    />
  );
}