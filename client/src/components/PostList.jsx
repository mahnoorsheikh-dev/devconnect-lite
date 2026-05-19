import React from 'react';
import Post from './Post';

export default function PostList ({ posts, onLikeUpdate, onCommentUpdate, user }) {
  
  return (
    <div>
      {(posts.length === 0) ? (
        <p>No posts</p>
   ) : (
        posts.map((post) => (
              <Post 
               key={post._id}
               post={post} 
               onLikeUpdate={onLikeUpdate}
               onCommentUpdate={onCommentUpdate}
               user={user}
              />
        ))
      )}
    </div>
  );
}