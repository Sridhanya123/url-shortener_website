export default function Modal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this URL?</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}