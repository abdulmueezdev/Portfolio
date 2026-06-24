'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Suspense, useState, useEffect, useCallback } from 'react'

function TerminalText() {
  const lines = [
    'MOV AX, @DATA',
    'MOV DS, AX',
    'START:',
    '  CALL RENDER_HERO',
    '  CMP AX, 0',
    '  JE EXIT',
    '  MOV AH, 09h',
    '  INT 21h',
    'EXIT:',
    '  MOV AH, 4Ch',
    '  INT 21h',
  ]
  const [visible, setVisible] = useState<string[]>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisible(v => [...v, line]), i * 120))
    })
    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        fontFamily: '"Space Grotesk", monospace',
        fontSize: '9px',
        color: '#55E6C1',
        whiteSpace: 'pre',
        textAlign: 'left',
        width: '220px',
        lineHeight: 1.6,
        textShadow: '0 0 8px rgba(85, 230, 193, 0.4)',
      }}
    >
      {visible.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      {visible.length < lines.length && (
        <span style={{ opacity: 0.6, animation: 'blink 1s step-end infinite' }}>█</span>
      )}
    </div>
  )
}

function LaptopModel({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const { lidRot } = useSpring({
    lidRot: isOpen ? -1.92 : 0,
    config: { tension: 80, friction: 20 },
  })

  return (
    <group onClick={onClick} dispose={null}>
      {/* Laptop base — slab */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#7f8c8d" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Keyboard area — dark inset */}
      <mesh position={[0, 0.01, 0.15]}>
        <boxGeometry args={[2.8, 0.02, 1.3]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.01, 0.9]}>
        <boxGeometry args={[1.0, 0.01, 0.5]} />
        <meshStandardMaterial color="#34495e" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Lid — animated around the hinge at the back of the base */}
      <animated.group position={[0, 0, -1.1]} rotation-x={lidRot}>
        {/* Lid body (back shell) */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#7f8c8d" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Screen bezel */}
        <mesh position={[0, 1.1, 0.051]}>
          <boxGeometry args={[3.1, 2.1, 0.01]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Screen display area */}
        <mesh position={[0, 1.1, 0.06]}>
          <boxGeometry args={[2.9, 1.9, 0.01]} />
          <meshStandardMaterial
            color={isOpen ? '#0a0a15' : '#111'}
            emissive={isOpen ? '#0a0a15' : '#000'}
            emissiveIntensity={isOpen ? 0.1 : 0}
          />
        </mesh>
        {/* Screen text — typed on lid interior */}
        {isOpen && (
          <Html position={[-0.8, 1.3, 0.08]} transform distanceFactor={1.5}>
            <TerminalText />
          </Html>
        )}
      </animated.group>
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6C5CE7" wireframe />
    </mesh>
  )
}

export default function HeroScene({ onBootComplete }: { onBootComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = useCallback(() => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(onBootComplete, 1200)
  }, [isOpen, onBootComplete])

  return (
    <Canvas
      style={{ width: '100%', height: '100%', cursor: isOpen ? 'default' : 'pointer' }}
      camera={{ position: [0, 2, 6], fov: 40 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#2F3640']} />
      <fog attach="fog" args={['#2F3640', 8, 20]} />

      <Suspense fallback={<LoadingFallback />}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[3, 3, 3]} color="#6C5CE7" intensity={3} distance={12} />
        <pointLight position={[-4, -1, -3]} color="#FF7675" intensity={1} distance={10} />
        <pointLight position={[0, 2, 4]} color="#55E6C1" intensity={0.5} distance={8} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <group rotation={[0.15, -0.3, 0]}>
            <LaptopModel isOpen={isOpen} onClick={handleClick} />
          </group>
        </Float>
      </Suspense>
    </Canvas>
  )
}
