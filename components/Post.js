// components/Post.js
export default function Post(props) {
  const post = props.post;

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <p className="mt-2 text-xs whitespace-pre-line text-slate-500">
              {post.metadata.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
