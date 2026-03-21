import { useState } from "react";
import { generateShortUrl } from "../utils/shortUrl";

export default function AddUrl({ refresh }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleAdd() {
    const user = localStorage.getItem("loggedInUser");
    let urls = JSON.parse(localStorage.getItem("urls")) || [];

    const userUrls = urls.filter(u => u.user === user);

    if (userUrls.length >= 5) {
      alert("Only 5 URLs allowed!");
      return;
    }

    urls.push({
      id: Date.now(),
      title,
      originalUrl: url,
      shortUrl: generateShortUrl(),
      createdAt: new Date().toLocaleString(),
      user
    });

    localStorage.setItem("urls", JSON.stringify(urls));
    setTitle("");
    setUrl("");
    refresh();
  }

  return (
    <div className="card p-3 mb-4 shadow">
      <h5>Add URL</h5>

      <input className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)} />

      <input className="form-control mb-2"
        placeholder="URL"
        value={url}
        onChange={e => setUrl(e.target.value)} />

      <button className="btn btn-primary" onClick={handleAdd}>
        Add URL
      </button>
    </div>
  );
}