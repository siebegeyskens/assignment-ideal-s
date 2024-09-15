const PostList = ({ searchTerm, onInputChange, filteredPosts, onOpenPost }) => {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        placeholder="search post titles"
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <span style={{ marginRight: 4 }}>{post.title}</span>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                onOpenPost(post);
              }}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
