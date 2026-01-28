import './ProvinceModal.css'

function ProvinceModal({ isOpen, provinceName, onClose }) {
  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{provinceName || 'Province Name'}</h2>
        <div className="modal-body">
          Content for this province will go here.
        </div>
      </div>
    </div>
  )
}

export default ProvinceModal
