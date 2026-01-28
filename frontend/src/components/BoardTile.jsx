import './BoardTile.css'

function BoardTile({ tile, position, playerPosition, isCorner = false }) {
  const hasPlayer = playerPosition === position
  const tileType = tile?.type || 'property'
  const tileColor = tile?.color || 'yellow'
  
  return (
    <div className={`board-tile ${tileType} ${isCorner ? 'corner' : ''} ${hasPlayer ? 'has-player' : ''} tet-tile tet-tile-${tileColor}`}>
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
              {tile?.reward && (
                <div className="reward-amount">x{tile.reward}</div>
              )}
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
