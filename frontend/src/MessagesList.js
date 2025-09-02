import React, { useEffect, useState } from "react";
import api from "./api";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/messages");
      setMessages(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      {messages.length === 0 ? (
        <p>No messages</p>
      ) : (
        <ul>
          {messages.map((m) => (
            <li key={m.id}>
              <strong>
                {m.name} &lt;{m.email}&gt;
              </strong>
              <p>{m.message}</p>
              <small>{new Date(m.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
