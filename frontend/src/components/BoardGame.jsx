import { useState, useEffect } from 'react'
import BoardTile from './BoardTile'
import PlayerInfo from './PlayerInfo'
import DiceRollScreen from './DiceRollScreen'
import './BoardGame.css'

// Generate Tet-themed board tiles
function generateBoardTiles() {
  const tiles = []
  
  // Corner tiles - Tet themed
  tiles.push({ position: 0, type: 'corner', name: 'Về đích', icon: '🏮', color: 'red' })
  
  // Tet-themed tiles for top row (right to left)
  const topRowTiles = [
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'Pháo', type: 'special', icon: '🎆', reward: 500, color: 'red' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'Lì xì', type: 'special', icon: '🧧', color: 'red' },
    { name: 'S +3', type: 'special', icon: '💰', reward: 3, color: 'red' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'May mắn', type: 'special', icon: '🎁', reward: 600, color: 'red' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'Quà Tết', type: 'special', icon: '🎁', color: 'red' }
  ]
  
  for (let i = 0; i < topRowTiles.length; i++) {
    tiles.push({
      position: i + 1,
      ...topRowTiles[i]
    })
  }
  
  tiles.push({ position: 10, type: 'corner', name: 'Cẩn thận', icon: '⚠️', color: 'red' })
  
  // Right column (top to bottom)
  const rightColumnTiles = [
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'Hoa đào', type: 'special', icon: '🌸', reward: 300, color: 'red' },
    { name: 'x800', type: 'reward', icon: '🪙', reward: 800, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' }
  ]
  
  for (let i = 0; i < rightColumnTiles.length; i++) {
    tiles.push({
      position: i + 11,
      ...rightColumnTiles[i]
    })
  }
  
  tiles.push({ position: 20, type: 'corner', name: 'Về đích', icon: '🏮', color: 'red' })
  
  // Bottom row (left to right) - reverse order
  const bottomRowTiles = [
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' }
  ]
  
  for (let i = 0; i < bottomRowTiles.length; i++) {
    tiles.push({
      position: i + 21,
      ...bottomRowTiles[i]
    })
  }
  
  tiles.push({ position: 30, type: 'corner', name: 'Cẩn thận', icon: '⚠️', color: 'red' })
  
  // Left column (bottom to top) - reverse order
  const leftColumnTiles = [
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' },
    { name: 'x200', type: 'reward', icon: '🪙', reward: 200, color: 'yellow' },
    { name: 'x400', type: 'reward', icon: '🪙', reward: 400, color: 'yellow' }
  ]
  
  for (let i = 0; i < leftColumnTiles.length; i++) {
    tiles.push({
      position: i + 31,
      ...leftColumnTiles[i]
    })
  }
  
  return tiles
}

function BoardGame({ provinceName, onClose }) {
  const [playerPosition, setPlayerPosition] = useState(0)
  const [playerMoney, setPlayerMoney] = useState(2450)
  const [playerGems, setPlayerGems] = useState(12)
  const [playerDiamonds, setPlayerDiamonds] = useState(18)
  const [luckyEnvelopeProgress, setLuckyEnvelopeProgress] = useState(65) // 0-100
  const [timeRemaining, setTimeRemaining] = useState(45) // seconds
  const [canRoll, setCanRoll] = useState(true)
  const [lastRoll, setLastRoll] = useState(null)
  const [tiles] = useState(generateBoardTiles())
  const [gameHistory, setGameHistory] = useState([])
  const [showDiceScreen, setShowDiceScreen] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(window.innerWidth > 768)

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) return 45 // Reset to 45
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Handle window resize for leaderboard visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && showLeaderboard) {
        setShowLeaderboard(false)
      } else if (window.innerWidth > 768 && !showLeaderboard) {
        setShowLeaderboard(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [showLeaderboard])

  const handleRollClick = () => {
    if (!canRoll) return
    setShowDiceScreen(true)
  }

  const handleDiceRollComplete = (value) => {
    setCanRoll(false)
    setLastRoll(value)
    setShowDiceScreen(false)
    
    // Move player
    setTimeout(() => {
      const newPosition = (playerPosition + value) % tiles.length
      setPlayerPosition(newPosition)
      
      // Check if passed GO
      if (newPosition < playerPosition) {
        setPlayerMoney(prev => prev + 200)
        setGameHistory(prev => [...prev, { type: 'passed_go', amount: 200 }])
      }
      
      // Handle tile landing
      const currentTile = tiles[newPosition]
      if (currentTile.type === 'chance') {
        // Random reward
        const reward = Math.floor(Math.random() * 200) + 50
        setPlayerMoney(prev => prev + reward)
        setGameHistory(prev => [...prev, { type: 'chance_reward', amount: reward }])
      }
      
      // Enable rolling again after a delay
      setTimeout(() => {
        setCanRoll(true)
      }, 1500)
    }, 500)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className={`board-game-container ${showDiceScreen ? 'dimmed' : ''}`}>
      {/* Tet-themed Header */}
      <div className="board-game-header tet-header">
        <div className="header-left">
          <div className="game-title">
            <span className="horse-icon">🐴</span>
            <h2>Ngựa vàng</h2>
          </div>
          <div className="lucky-envelope-section">
            <span className="envelope-icon">🧧</span>
            <span className="envelope-label">Lì xì may mắn</span>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${luckyEnvelopeProgress}%` }}></div>
            </div>
            <span className="timer">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <div className="header-right">
          <div className="resource-item">
            <div className="resource-icon gem-icon">💎</div>
            <span className="resource-value">{playerGems}</span>
          </div>
          <div className="resource-item">
            <div className="resource-icon coin-icon">🪙</div>
            <span className="resource-value">{playerMoney.toLocaleString()}</span>
          </div>
          <div className="resource-item">
            <div className="resource-icon diamond-icon">💠</div>
            <span className="resource-value">{playerDiamonds}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>

      {/* Leaderboard Section */}
      {showLeaderboard && (
        <div className="leaderboard-section">
          <div className="leaderboard-header">
            <span className="trophy-icon">🏆</span>
            <h3>Bảng Xếp Hạng</h3>
            <button 
              className="toggle-leaderboard" 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              ▼
            </button>
          </div>
        </div>
      )}
      
      <div className="board-game-content">
        {/* Board */}
        <div className="board-wrapper">
          <div className="board">
            {/* Top row */}
            <div className="board-row board-row-top">
              {tiles.slice(0, 11).map((tile, idx) => (
                <BoardTile
                  key={tile.position}
                  tile={tile}
                  position={tile.position}
                  playerPosition={playerPosition}
                  isCorner={tile.type === 'corner'}
                />
              ))}
            </div>
            
            {/* Middle section */}
            <div className="board-middle">
              {/* Left column */}
              <div className="board-column board-column-left">
                {tiles.slice(31, 40).reverse().map((tile) => (
                  <BoardTile
                    key={tile.position}
                    tile={tile}
                    position={tile.position}
                    playerPosition={playerPosition}
                  />
                ))}
              </div>
              
              {/* Center panel */}
              <div className="board-center">
                <div className="dice-platform">
                  <div className="dice-display">
                    {lastRoll ? (
                      <div className="dice-value-display">
                        <div className="dice-number">{lastRoll}</div>
                      </div>
                    ) : (
                      <div className="dice-placeholder">🎲</div>
                    )}
                  </div>
                </div>
                <PlayerInfo money={playerMoney} lastRoll={lastRoll} />
                <button 
                  className="roll-dice-button" 
                  onClick={handleRollClick}
                  disabled={!canRoll}
                >
                  🎲 Gieo Xúc Xắc
                </button>
                {gameHistory.length > 0 && (
                  <div className="game-history">
                    <div className="history-title">Sự kiện gần đây</div>
                    {gameHistory.slice(-3).map((event, idx) => (
                      <div key={idx} className="history-item">
                        {event.type === 'passed_go' && `🎯 Về đích: +${event.amount}`}
                        {event.type === 'chance_reward' && `🎁 Phần thưởng: +${event.amount}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right column */}
              <div className="board-column board-column-right">
                {tiles.slice(11, 20).reverse().map((tile) => (
                  <BoardTile
                    key={tile.position}
                    tile={tile}
                    position={tile.position}
                    playerPosition={playerPosition}
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom row */}
            <div className="board-row board-row-bottom">
              {tiles.slice(21, 31).reverse().map((tile) => (
                <BoardTile
                  key={tile.position}
                  tile={tile}
                  position={tile.position}
                  playerPosition={playerPosition}
                  isCorner={tile.type === 'corner'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Dice Roll Screen Overlay */}
      <DiceRollScreen 
        isVisible={showDiceScreen}
        onRollComplete={handleDiceRollComplete}
        canRoll={canRoll}
      />
    </div>
  )
}

export default BoardGame
