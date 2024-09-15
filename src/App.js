import { useEffect, useState } from "react";

import PostDetailed from "./components/PostDetailed";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([]); // Clean state with all posts for filtering
  const [searchTerm, setSearchTerm] = useState(""); // Controlled input element
  const [openedPost, setOpenedPost] = useState(null);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  const handleOpenPost = async (post) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );
      const data = await response.json();
      setOpenedPost({ ...post, comments: data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePost = () => {
    setOpenedPost(null);
  };

  return !openedPost ? (
    <PostList
      searchTerm={searchTerm}
      onInputChange={handleInputChange}
      filteredPosts={filteredPosts}
      onOpenPost={handleOpenPost}
    />
  ) : (
    <PostDetailed openedPost={openedPost} onClosePost={handleClosePost} />
  );
}

export default App;
