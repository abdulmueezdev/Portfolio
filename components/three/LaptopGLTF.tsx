'use client'
import React from 'react'
import { Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { TerminalText } from './TerminalText'

export function LaptopGLTF({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return <FallbackLaptopModel isOpen={isOpen} onClick={onClick} />
}

function FallbackLaptopModel({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const { lidRot } = useSpring({
    lidRot: isOpen ? -1.92 : 0,
    config: { tension: 80, friction: 20 },
  })

  return (
    <group onClick={onClick} dispose={null}>
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#7f8c8d" metalness={0.6} roughness={0.3} />
      </mesh>
      <animated.group position={[0, 0, -1.1]} rotation-x={lidRot}>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#7f8c8d" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.1, 0.051]}>
          <boxGeometry args={[3.1, 2.1, 0.01]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {isOpen && (
          <Html position={[-0.8, 1.3, 0.08]} transform distanceFactor={1.5}>
            <TerminalText />
          </Html>
        )}
      </animated.group>
    </group>
  )
}


