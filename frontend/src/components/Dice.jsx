import { useState } from 'react'
import './Dice.css'

function DiceFace({ value, rolling = false }) {
  if (rolling) {
    return (
      <div className="dice-face">
        <div className="dot dot-rolling">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="pip"></span>
          ))}
        </div>
      </div>
    )
  }

  const pips = []
  if (value === 1) {
    pips.push(<span key="center" className="pip pip-center"></span>)
  } else if (value === 2) {
    pips.push(<span key="tl" className="pip pip-top-left"></span>)
    pips.push(<span key="br" className="pip pip-bottom-right"></span>)
  } else if (value === 3) {
    pips.push(<span key="tl" className="pip pip-top-left"></span>)
    pips.push(<span key="center" className="pip pip-center"></span>)
    pips.push(<span key="br" className="pip pip-bottom-right"></span>)
  } else if (value === 4) {
    pips.push(<span key="tl" className="pip pip-top-left"></span>)
    pips.push(<span key="tr" className="pip pip-top-right"></span>)
    pips.push(<span key="bl" className="pip pip-bottom-left"></span>)
    pips.push(<span key="br" className="pip pip-bottom-right"></span>)
  } else if (value === 5) {
    pips.push(<span key="tl" className="pip pip-top-left"></span>)
    pips.push(<span key="tr" className="pip pip-top-right"></span>)
    pips.push(<span key="center" className="pip pip-center"></span>)
    pips.push(<span key="bl" className="pip pip-bottom-left"></span>)
    pips.push(<span key="br" className="pip pip-bottom-right"></span>)
  } else if (value === 6) {
    pips.push(<span key="tl" className="pip pip-top-left"></span>)
    pips.push(<span key="tr" className="pip pip-top-right"></span>)
    pips.push(<span key="ml" className="pip pip-middle-left"></span>)
    pips.push(<span key="mr" className="pip pip-middle-right"></span>)
    pips.push(<span key="bl" className="pip pip-bottom-left"></span>)
    pips.push(<span key="br" className="pip pip-bottom-right"></span>)
  }

  return (
    <div className="dice-face">
      <div className={`dot dot-${value}`}>
        {pips}
      </div>
    </div>
  )
}

function Dice({ onRoll, disabled = false }) {
  const [isRolling, setIsRolling] = useState(false)
  const [currentValue, setCurrentValue] = useState(null)

  const rollDice = () => {
    if (disabled || isRolling) return

    setIsRolling(true)
    setCurrentValue(null)

    // Animate for 1 second
    setTimeout(() => {
      const value1 = Math.floor(Math.random() * 6) + 1
      const value2 = Math.floor(Math.random() * 6) + 1
      const total = value1 + value2
      
      setCurrentValue({ value1, value2, total })
      setIsRolling(false)
      
      if (onRoll) {
        onRoll(total)
      }
    }, 1000)
  }

  return (
    <div className="dice-container">
      <div className="dice-wrapper" onClick={rollDice}>
        <div className={`dice ${isRolling ? 'rolling' : ''} ${disabled ? 'disabled' : ''}`}>
          {currentValue ? (
            <>
              <DiceFace value={currentValue.value1} />
              <DiceFace value={currentValue.value2} />
            </>
          ) : (
            <>
              <DiceFace value={null} rolling />
              <DiceFace value={null} rolling />
            </>
          )}
        </div>
      </div>
      {currentValue && (
        <div className="dice-result">
          <span className="dice-total">{currentValue.total}</span>
        </div>
      )}
      {!disabled && !isRolling && (
        <button className="roll-button" onClick={rollDice}>
          Roll Dice
        </button>
      )}
    </div>
  )
}

export default Dice
