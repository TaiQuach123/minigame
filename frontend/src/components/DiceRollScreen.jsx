import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Dice3D from './Dice3D'
import './DiceRollScreen.css'

function DiceRollScreen({ isVisible, onRollComplete, canRoll }) {
  const [isRolling, setIsRolling] = useState(false)
  const [currentValue, setCurrentValue] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [hasRolled, setHasRolled] = useState(false)

  useEffect(() => {
    // Reset state when screen closes
    if (!isVisible) {
      setIsRolling(false)
      setCurrentValue(null)
      setShowResult(false)
      setHasRolled(false)
    }
  }, [isVisible])

  useEffect(() => {
    // Auto-start rolling when screen becomes visible and can roll
    if (isVisible && canRoll && !hasRolled && !isRolling) {
      const timer = setTimeout(() => {
        startRoll()
      }, 300) // Small delay for smooth transition
      return () => clearTimeout(timer)
    }
  }, [isVisible, canRoll]) // eslint-disable-line react-hooks/exhaustive-deps

  const startRoll = () => {
    if (!canRoll || isRolling) return

    setIsRolling(true)
    setCurrentValue(null)
    setShowResult(false)
    setHasRolled(true)

    // Animate for 1.5 seconds
    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1
      setCurrentValue(value)
      setIsRolling(false)
      setShowResult(true)

      // Show result for 1.5 seconds, then call callback
      setTimeout(() => {
        if (onRollComplete) {
          onRollComplete(value)
        }
        // Reset after callback
        setTimeout(() => {
          setCurrentValue(null)
          setShowResult(false)
          setHasRolled(false)
        }, 500)
      }, 1500)
    }, 1500)
  }

  if (!isVisible) return null

  return (
    <div className="dice-roll-screen-overlay">
      <div className="dice-roll-screen-content">
        <div className="dice-roll-title">🎲 Gieo Xúc Xắc!</div>
        <div className="dice-roll-container">
          <div className="dice-3d-wrapper">
            <Suspense fallback={<div className="dice-loading">Loading...</div>}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true }}
              >
                {/* Lighting setup for Tet theme */}
                <ambientLight intensity={0.6} />
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={1}
                  castShadow
                />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FFD700" />
                <pointLight position={[5, -5, 5]} intensity={0.5} color="#C8102E" />
                
                {/* Environment for better reflections */}
                <Environment preset="sunset" />
                
                {/* 3D Dice with Tet holiday theme */}
                <Dice3D isRolling={isRolling} value={currentValue} />
                
                {/* Optional: Allow slight rotation for better view */}
                {!isRolling && currentValue && (
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={1}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                  />
                )}
              </Canvas>
            </Suspense>
          </div>
          {showResult && currentValue && (
            <div className="dice-result-large">
              <div className="result-label">Bạn đã gieo được:</div>
              <div className="result-value">{currentValue}</div>
            </div>
          )}
        </div>
        {!isRolling && !currentValue && canRoll && !hasRolled && (
          <button className="roll-button-large" onClick={startRoll}>
            Gieo Xúc Xắc
          </button>
        )}
      </div>
    </div>
  )
}

export default DiceRollScreen
