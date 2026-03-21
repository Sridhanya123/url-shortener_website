import { useState, useEffect } from "react";

export default function EditUrl({ show, urlData, onUpdate, onClose }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (urlData) {
      setTitle(urlData.title);
      setUrl(urlData.originalUrl);
    }
  }, [urlData]);

  if (!show) return null;

  function handleUpdate() {
    const updated = {
      ...urlData,
      title,
      originalUrl: url
    };

    onUpdate(updated);
  }

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Edit URL</h5>
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              className="form-control"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleUpdate}>
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}