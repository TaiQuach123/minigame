import './PlayerInfo.css'

function PlayerInfo({ money, lastRoll }) {
  return (
    <div className="player-info">
      <div className="player-header">
        <div className="player-name">You</div>
        <div className="player-icon">🐴</div>
      </div>
      <div className="player-stats">
        <div className="stat-item">
          <span className="stat-label">💰 Money:</span>
          <span className="stat-value">{money.toLocaleString()}</span>
        </div>
        {lastRoll && (
          <div className="stat-item">
            <span className="stat-label">🎲 Last Roll:</span>
            <span className="stat-value">{lastRoll}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerInfo
