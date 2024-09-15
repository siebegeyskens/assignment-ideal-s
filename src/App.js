import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]); // Clean state with all posts for filtering
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered posts to render
  const [searchValue, setSearchValue] = useState(""); // Controlled input element
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleOpenPost = async (post) => {
    try{
      const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );
      const data = await response.json();
      setSelectedPost({ ...post, comments: data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const buttonStyle = { cursor: "pointer" };

  return !selectedPost ? (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="search post titles"
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <span style={{ marginRight: 4 }}>{post.title}</span>
            <button
              style={buttonStyle}
              onClick={() => {
                handleOpenPost(post);
              }}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <button style={buttonStyle} onClick={handleClosePost}>
        Close
      </button>
      <h1>{selectedPost.title}</h1>
      <p>{selectedPost.body}</p>
      <h2>Comments</h2>
      <ul>
        {selectedPost.comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
