import './BoardTile.css'

function BoardTile({ tile, position, playerPosition, isCorner = false }) {
  const hasPlayer = playerPosition === position
  const tileType = tile?.type || 'property'
  
  return (
    <div className={`board-tile ${tileType} ${isCorner ? 'corner' : ''} ${hasPlayer ? 'has-player' : ''}`}>
      {isCorner ? (
        <div className="corner-content">
          <div className="corner-icon">{tile?.icon || '🏠'}</div>
          <div className="corner-name">{tile?.name || 'Corner'}</div>
        </div>
      ) : (
        <>
          {tileType === 'chance' ? (
            <div className="chance-tile">
              <div className="chance-icon">?</div>
            </div>
          ) : (
            <div className="property-tile">
              {tile?.icon && <div className="property-icon">{tile.icon}</div>}
              {tile?.name && <div className="property-name">{tile.name}</div>}
            </div>
          )}
        </>
      )}
      {hasPlayer && (
        <div className="player-token">
          <div className="token">🐴</div>
        </div>
      )}
    </div>
  )
}

export default BoardTile
