import { useEffect, useState } from "react";
import AddUrl from "./AddUrl";
import Navbar from "./Navbar";
import Modal from "./Modal";
import EditUrl from "./EditUrl";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  

  const perPage = 3;

  function loadUrls() {
    const user = localStorage.getItem("loggedInUser");
    const all = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(all.filter(u => u.user === user));
  }

  useEffect(() => {
    loadUrls();
  }, []);

  // 🔍 Search button logic
  function handleSearch() {
    setSearch(searchInput);
    setPage(1);
  }

  // 🗑 Delete
  function handleDelete(id) {
    setDeleteId(id);
    setShowModal(true);
  }

  function confirmDelete() {
    let all = JSON.parse(localStorage.getItem("urls")) || [];
    all = all.filter(u => u.id !== deleteId);
    localStorage.setItem("urls", JSON.stringify(all));
    setShowModal(false);
    loadUrls();
  }

  // ✏️ Edit
  function handleEdit(url) {
    setEditData(url);
    setShowEdit(true);
  }

  function updateUrl(updatedUrl) {
    let all = JSON.parse(localStorage.getItem("urls")) || [];

    all = all.map(u => (u.id === updatedUrl.id ? updatedUrl : u));

    localStorage.setItem("urls", JSON.stringify(all));
    setShowEdit(false);
    loadUrls();
  }

  // 🔍 Filtering
  const filtered = urls.filter(u =>
    u.title.toLowerCase().includes(search.toLowerCase()) ||
    u.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <AddUrl refresh={loadUrls} />

        {/* 🔍 Search UI */}
        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder="Search by title or URL..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* 📊 Table */}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Short URL</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(u => (
              <tr key={u.id}>
                <td>{u.title}</td>
                <td>{u.shortUrl}</td>
                <td>{u.createdAt}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <button
            className="btn btn-secondary"
            disabled={start + perPage >= filtered.length}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />

      {/* Edit Modal */}
      <EditUrl
        show={showEdit}
        urlData={editData}
        onUpdate={updateUrl}
        onClose={() => setShowEdit(false)}
      />
    </div>
  );
}