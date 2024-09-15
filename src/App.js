import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]); // Clean state with all posts for filtering 
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered posts to render
  const [searchValue, setSearchValue] = useState(''); // Controlled input element

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    const filtered = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPosts(filtered);
  }
  
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleInputChange} placeholder="search post titles" />
      <ul> 
        {filteredPosts.map(post => <li key={post.id}><p>{post.title}</p></li>)}
      </ul>
    </div>
  );
}

export default App;
