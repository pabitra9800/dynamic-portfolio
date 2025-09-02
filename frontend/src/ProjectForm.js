import React, { useEffect, useState } from "react";
import api from "./api";

export default function ProjectForm({ onSaved, editing, setEditing }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [github_link, setGithubLink] = useState("");
  const [live_link, setLiveLink] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setDescription(editing.description || "");
      setImageUrl(editing.image_url || "");
      setTags(editing.tags || "");
      setGithubLink(editing.github_link || "");
      setLiveLink(editing.live_link || "");
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setTags("");
      setGithubLink("");
      setLiveLink("");
    }
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      image_url,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      github_link,
      live_link,
    };

    if (editing) {
      await api.put(`/projects/${editing.id}`, payload);
      setEditing(null);
    } else {
      await api.post("/projects", payload);
    }
    onSaved();
  };

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="tags (comma separated)"
      />
      <input
        value={github_link}
        onChange={(e) => setGithubLink(e.target.value)}
        placeholder="GitHub link"
      />
      <input
        value={live_link}
        onChange={(e) => setLiveLink(e.target.value)}
        placeholder="Live link"
      />
      <button type="submit">{editing ? "Update" : "Create"}</button>
      {editing && (
        <button type="button" onClick={() => setEditing(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}
