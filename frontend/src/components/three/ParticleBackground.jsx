"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedParticles({ userType }) {
  const ref = useRef()
  const particleCount = 2000

  // Generate random particle positions
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [particleCount])

  // Generate colors based on user type
  const colors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3)
    const color1 = userType === 'student' ? new THREE.Color('#3b82f6') : new THREE.Color('#8b5cf6')
    const color2 = new THREE.Color('#10b981')
    
    for (let i = 0; i < particleCount; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }
    return colors
  }, [userType, particleCount])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={userType === 'student' ? '#3b82f6' : '#8b5cf6'}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingGeometry({ userType }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  const geometry = userType === 'student' ? (
    <icosahedronGeometry args={[1, 1]} />
  ) : (
    <octahedronGeometry args={[1, 2]} />
  )

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      {geometry}
      <meshStandardMaterial
        color={userType === 'student' ? '#3b82f6' : '#8b5cf6'}
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  )
}

function NetworkLines() {
  const linesRef = useRef()
  
  const points = useMemo(() => {
    const points = []
    for (let i = 0; i < 50; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        )
      )
    }
    return points
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={linesRef}>
      {points.map((point, index) => (
        points.slice(index + 1).map((nextPoint, nextIndex) => {
          const distance = point.distanceTo(nextPoint)
          if (distance < 3) {
            return (
              <line key={`${index}-${nextIndex}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([
                      point.x, point.y, point.z,
                      nextPoint.x, nextPoint.y, nextPoint.z
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color="#10b981"
                  transparent
                  opacity={0.2}
                />
              </line>
            )
          }
          return null
        })
      ))}
    </group>
  )
}

export default function ParticleBackground({ userType }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <AnimatedParticles userType={userType} />
        <FloatingGeometry userType={userType} />
        <NetworkLines />
      </Canvas>
    </div>
  )
}