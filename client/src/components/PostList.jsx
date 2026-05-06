import React from 'react';
export default function PostList ({ posts }) {
  
  
  
  return (
    <div>
      {(posts.length === 0) ? (
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