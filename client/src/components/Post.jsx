export default function Post ({ post }) {
  return (
    <div>
        <p>{post.content} - {post.user.name}</p>
      </div>
  );
}
      