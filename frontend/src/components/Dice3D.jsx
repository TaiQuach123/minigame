import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// Vietnamese Tet holiday colors
const TET_RED = '#C8102E' // Traditional Vietnamese red
const TET_GOLD = '#FFD700' // Prosperity gold
const TET_DARK_RED = '#8B0000' // Darker red for contrast

function DiceFace({ value, position, rotation, textRotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Face background with white/ivory color */}
      <mesh>
        <planeGeometry args={[0.9, 0.9]} />
        <meshStandardMaterial 
          color="#FFF8E7" 
          roughness={0.3}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Number text - Tet red color */}
      <group rotation={textRotation}>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.6}
          color={TET_RED}
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
          outlineWidth={0.02}
          outlineColor={TET_GOLD}
          depthTest={false}
          renderOrder={1}
        >
          {value}
        </Text>
      </group>
      
      {/* Decorative gold border ring */}
      <mesh>
        <ringGeometry args={[0.42, 0.45, 32]} />
        <meshStandardMaterial 
          color={TET_GOLD} 
          roughness={0.2}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function Dice3D({ isRolling = false, value = null, onAnimationComplete }) {
  const meshRef = useRef()
  const rotationSpeed = useRef({ x: 0, y: 0, z: 0 })
  const targetRotation = useRef({ x: 0, y: 0, z: 0 })
  
  // Initialize rotation speeds when rolling starts
  useMemo(() => {
    if (isRolling) {
      rotationSpeed.current = {
        x: (Math.random() - 0.5) * 1.2,
        y: (Math.random() - 0.5) * 1.2,
        z: (Math.random() - 0.5) * 1.2
      }
    } else if (value !== null) {
      // Set target rotation based on dice value
      // Each value corresponds to a different face orientation
      const rotations = {
        1: { x: 0, y: 0, z: 0 },
        2: { x: Math.PI / 2, y: 0, z: 0 },
        3: { x: 0, y: Math.PI / 2, z: 0 },
        4: { x: 0, y: -Math.PI / 2, z: 0 },
        5: { x: -Math.PI / 2, y: 0, z: 0 },
        6: { x: Math.PI, y: 0, z: 0 }
      }
      targetRotation.current = rotations[value] || { x: 0, y: 0, z: 0 }
    }
  }, [isRolling, value])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    if (isRolling) {
      // Moderate random rotation during rolling
      meshRef.current.rotation.x += rotationSpeed.current.x * delta * 25
      meshRef.current.rotation.y += rotationSpeed.current.y * delta * 25
      meshRef.current.rotation.z += rotationSpeed.current.z * delta * 25
      
      // Add some randomness to rotation speeds for dynamic rolling
      rotationSpeed.current.x += (Math.random() - 0.5) * 0.3
      rotationSpeed.current.y += (Math.random() - 0.5) * 0.3
      rotationSpeed.current.z += (Math.random() - 0.5) * 0.3
      
      // Keep speeds within reasonable bounds
      rotationSpeed.current.x = Math.max(-2, Math.min(2, rotationSpeed.current.x))
      rotationSpeed.current.y = Math.max(-2, Math.min(2, rotationSpeed.current.y))
      rotationSpeed.current.z = Math.max(-2, Math.min(2, rotationSpeed.current.z))
    } else if (value !== null) {
      // Smoothly rotate to target position
      const lerpFactor = 0.1
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        lerpFactor
      )
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        lerpFactor
      )
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        targetRotation.current.z,
        lerpFactor
      )
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main dice cube with Tet red color */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={TET_RED}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      
      {/* Gold decorative edges for Tet theme */}
      <mesh>
        <boxGeometry args={[1.02, 1.02, 1.02]} />
        <meshStandardMaterial
          color={TET_GOLD}
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
      
      {/* Dice faces with numbers - always visible */}
      {/* Face 1: Front (Z+) */}
      <DiceFace value={1} position={[0, 0, 0.501]} rotation={[0, 0, 0]} />
      {/* Face 2: Top (Y+) */}
      <DiceFace value={2} position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* Face 3: Left (X-) - needs text rotation fix */}
      <DiceFace value={3} position={[-0.501, 0, 0]} rotation={[0, Math.PI / 2, 0]} textRotation={[0, Math.PI, 0]} />
      {/* Face 4: Right (X+) - needs text rotation fix */}
      <DiceFace value={4} position={[0.501, 0, 0]} rotation={[0, -Math.PI / 2, 0]} textRotation={[0, Math.PI, 0]} />
      {/* Face 5: Bottom (Y-) */}
      <DiceFace value={5} position={[0, -0.501, 0]} rotation={[Math.PI / 2, 0, 0]} />
      {/* Face 6: Back (Z-) */}
      <DiceFace value={6} position={[0, 0, -0.501]} rotation={[0, Math.PI, 0]} />
    </group>
  )
}

export default Dice3D
