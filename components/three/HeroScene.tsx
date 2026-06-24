'use client'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useState, useEffect, useCallback } from 'react'
import { LaptopGLTF } from './LaptopGLTF'

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = useCallback(() => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(onBootComplete, 1200)
  }, [isOpen, onBootComplete])

  if (!mounted) return null

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
            <LaptopGLTF isOpen={isOpen} onClick={handleClick} />
          </group>
        </Float>
      </Suspense>
    </Canvas>
  )
}
