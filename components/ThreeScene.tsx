'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x += 0.0006
    meshRef.current.rotation.z += 0.001
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.12
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.7, 0]} />
      <meshStandardMaterial
        color="#12121F"
        emissive="#8AAFC8"
        emissiveIntensity={0.22}
        metalness={0.9}
        roughness={0.12}
      />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.25} color="#ECE8F6" />
      <pointLight position={[2.5, 2, 2]} intensity={1.6} color="#8AAFC8" />
      <pointLight position={[-2, -1.5, -1]} intensity={0.4} color="#A090D8" />
      <FloatingShape />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  )
}
