const PostList = ({
  searchTerm,
  onInputChange,
  filteredPosts,
  onOpenPost,
  loadingPostId,
}) => {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        placeholder="search post titles"
      />
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <span style={{ marginRight: 4 }}>{post.title}</span>
              <button
                disabled={post.id === loadingPostId}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onOpenPost(post);
                }}
              >
                {post.id === loadingPostId ? "..." : "view"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
