import React from 'react';
import Post from './Post';

export default function PostList ({ posts, onLikeUpdate, user }) {
  
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
               user={user}
              />
        ))
      )}
    </div>
  );
}