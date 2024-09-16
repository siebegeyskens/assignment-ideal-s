import { useEffect, useState, useRef } from "react";

import PostDetailed from "./components/PostDetailed";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([]); // Clean state with all posts for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [postsError, setPostsError] = useState(null);

  const abortControllerRef = useRef(null);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPosts = async () => {
      setIsPostsLoading(true);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
        setPostsError(true);
      } finally {
        setIsPostsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  const fetchComments = async (postId, controller) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        { signal: controller.signal }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
      return comments;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error);
        return null;
      }
    }
  }

  const handleOpenPost = async (post) => {
    setLoadingPostId(post.id);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const comments = await fetchComments(post.id, controller);

    // only clear loading state and update selectedPost state if fetch wasn't aborted.
    if (!controller.signal.aborted) {
      setSelectedPost({...post, comments: comments}); 
      setLoadingPostId(null);
    }
  }

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  if (postsError) {
    return (
      <p style={{ color: "red" }}>
        There was an error loading the posts. Refresh to try again.
      </p>
    );
  }

  if (isPostsLoading) {
    return <p>Loading posts ...</p>;
  }

  return selectedPost ? (
    <PostDetailed
      selectedPost={selectedPost}
      onClosePost={handleClosePost}
      onRetry={handleOpenPost}
    />
  ) : (
    <PostList
      searchTerm={searchTerm}
      onInputChange={handleInputChange}
      filteredPosts={filteredPosts}
      onOpenPost={handleOpenPost}
      isPostsLoading={isPostsLoading}
      loadingPostId={loadingPostId}
    />
  );
}

export default App;
