// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio/projects')
    // axios.get('/api/portfolio/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>My Portfolio</h1>
      {projects.map(proj => (
        <div key={proj.id}>
          <h2>{proj.title}</h2>
          <p>{proj.description}</p>
          <a href={proj.github_link}>GitHub</a>
          <a href={proj.live_link}>Live</a>
        </div>
      ))}
    </div>
  );
}
export default App;
