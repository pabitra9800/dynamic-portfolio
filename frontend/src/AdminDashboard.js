import React from "react";
import ProjectsList from "./ProjectsList";
import MessagesList from "./MessagesList";

export default function AdminDashboard() {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>

      <section>
        <h2>Projects</h2>
        <ProjectsList />
      </section>

      <section>
        <h2>Messages</h2>
        <MessagesList />
      </section>
    </div>
  );
}
