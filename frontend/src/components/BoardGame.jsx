import { useState, useEffect } from 'react'
import BoardTile from './BoardTile'
import PlayerInfo from './PlayerInfo'
import DiceRollScreen from './DiceRollScreen'
import './BoardGame.css'

// Generate board tiles (40 tiles total: 4 corners + 36 regular tiles)
function generateBoardTiles() {
  const tiles = []
  
  // Corner tiles
  tiles.push({ position: 0, type: 'corner', name: 'GO', icon: '🎯' })
  
  // Regular tiles (9 per side)
  const tileTypes = ['property', 'property', 'chance', 'property', 'property', 'chance', 'property', 'property', 'property']
  const icons = ['🏠', '🏢', '', '🏦', '🏛️', '', '🏪', '🏨', '🏗️']
  
  // Top row (right to left)
  for (let i = 0; i < 9; i++) {
    tiles.push({
      position: i + 1,
      type: tileTypes[i],
      name: `Tile ${i + 1}`,
      icon: icons[i]
    })
  }
  
  tiles.push({ position: 10, type: 'corner', name: 'Casino', icon: '🎰' })
  
  // Right column (top to bottom)
  for (let i = 0; i < 9; i++) {
    tiles.push({
      position: i + 11,
      type: tileTypes[i],
      name: `Tile ${i + 11}`,
      icon: icons[i]
    })
  }
  
  tiles.push({ position: 20, type: 'corner', name: 'Jail', icon: '🔒' })
  
  // Bottom row (left to right)
  for (let i = 0; i < 9; i++) {
    tiles.push({
      position: i + 21,
      type: tileTypes[i],
      name: `Tile ${i + 21}`,
      icon: icons[i]
    })
  }
  
  tiles.push({ position: 30, type: 'corner', name: 'Lottery', icon: '🎫' })
  
  // Left column (bottom to top)
  for (let i = 0; i < 9; i++) {
    tiles.push({
      position: i + 31,
      type: tileTypes[i],
      name: `Tile ${i + 31}`,
      icon: icons[i]
    })
  }
  
  return tiles
}

function BoardGame({ provinceName, onClose }) {
  const [playerPosition, setPlayerPosition] = useState(0)
  const [playerMoney, setPlayerMoney] = useState(1500)
  const [canRoll, setCanRoll] = useState(true)
  const [lastRoll, setLastRoll] = useState(null)
  const [tiles] = useState(generateBoardTiles())
  const [gameHistory, setGameHistory] = useState([])
  const [showDiceScreen, setShowDiceScreen] = useState(false)

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

  return (
    <div className={`board-game-container ${showDiceScreen ? 'dimmed' : ''}`}>
      <div className="board-game-header">
        <h2>{provinceName || 'Board Game'}</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      
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
                <PlayerInfo money={playerMoney} lastRoll={lastRoll} />
                <button 
                  className="roll-dice-button" 
                  onClick={handleRollClick}
                  disabled={!canRoll}
                >
                  🎲 Roll Dice
                </button>
                {gameHistory.length > 0 && (
                  <div className="game-history">
                    <div className="history-title">Recent Events</div>
                    {gameHistory.slice(-3).map((event, idx) => (
                      <div key={idx} className="history-item">
                        {event.type === 'passed_go' && `🎯 Passed GO: +${event.amount}`}
                        {event.type === 'chance_reward' && `🎁 Chance Reward: +${event.amount}`}
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
