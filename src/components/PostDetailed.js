const PostDetailed = ({ selectedPost, onClosePost }) => {
  return (
    <div>
      <button style={{ cursor: "pointer" }} onClick={onClosePost}>
        Close
      </button>
      <h1>{selectedPost.title}</h1>
      <p>{selectedPost.body}</p>
      <h2>Comments</h2>
      {!selectedPost.comments ? (
        <div>
          <p style={{ color: "red" }}>
            There was a problem loading the comments. Please try again.
          </p>
        </div>
      ) : selectedPost.comments.length === 0 ? (
        <p>No comments yet ...</p>
      ) : (
        <ul>
          {selectedPost.comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostDetailed;
