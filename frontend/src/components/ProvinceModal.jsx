import './ProvinceModal.css'
import BoardGame from './BoardGame'

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
      <div className="modal-content board-game-modal" onClick={(e) => e.stopPropagation()}>
        <BoardGame provinceName={provinceName} onClose={onClose} />
      </div>
    </div>
  )
}

export default ProvinceModal
