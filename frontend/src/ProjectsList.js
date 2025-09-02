import React, { useEffect, useState } from "react";
import api from "./api";
import ProjectForm from "./ProjectForm";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetch = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await api.delete(`/projects/${id}`);
    fetch();
  };

  return (
    <div>
      <ProjectForm onSaved={fetch} editing={editing} setEditing={setEditing} />
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div>
              <button onClick={() => setEditing(p)}>Edit</button>
              <button onClick={() => remove(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
