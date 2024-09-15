const PostDetailed = ({ openedPost, onClosePost }) => {
  return (
    <div>
      <button style={{ cursor: "pointer" }} onClick={onClosePost}>
        Close
      </button>
      <h1>{openedPost.title}</h1>
      <p>{openedPost.body}</p>
      <h2>Comments</h2>
      <ul>
        {openedPost.comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailed;
