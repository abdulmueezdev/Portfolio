'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Suspense, useState, useEffect } from 'react'

function TerminalText() {
  const lines = ['MOV AX, @DATA', 'MOV DS, AX', 'START:', 'CALL RENDER_HERO', 'CMP AX, 0', 'JE EXIT']
  const [visible, setVisible] = useState<string[]>([])
  
  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => setVisible(v => [...v, line]), i * 180)
    })
  }, [])
  
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#55E6C1', whiteSpace: 'pre', textAlign: 'left', width: '200px' }}>
      {visible.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  )
}

function LaptopModel({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  // Rotate lid backwards by -1.92 rad (~110 deg)
  const { lidRot } = useSpring({
    lidRot: isOpen ? -1.92 : 0,   
    config: { tension: 80, friction: 20 },
  })

  return (
    <group onClick={onClick} dispose={null}>
      {/* Laptop base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Keyboard area */}
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[2.8, 0.02, 1.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Lid — animated around the hinge at the back of the base */}
      <animated.group position={[0, 0, -1.1]} rotation-x={lidRot}>
        {/* Lid body */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 1.1, 0.06]}>
          <boxGeometry args={[3.0, 2.0, 0.01]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Screen text typed on lid interior */}
        {isOpen && (
          <Html position={[0, 1.1, 0.07]} center transform distanceFactor={1.5}>
            <TerminalText />
          </Html>
        )}
      </animated.group>
    </group>
  )
}

export default function HeroScene({ onBootComplete }: { onBootComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(onBootComplete, 1200)
  }

  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 45 }} style={{ background: '#2F3640' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} color="#6C5CE7" intensity={2} />
        <pointLight position={[-4, -2, -4]} color="#FF7675" intensity={0.4} />
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <LaptopModel isOpen={isOpen} onClick={handleClick} />
        </Float>
      </Suspense>
    </Canvas>
  )
}
