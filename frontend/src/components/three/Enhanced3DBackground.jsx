"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, MeshDistortMaterial, Sphere, Torus, Box, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

// Animated Particles Component
function AnimatedParticles({ userType }) {
  const ref = useRef()
  const particleCount = 1500

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [particleCount])

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
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={userType === 'student' ? '#3b82f6' : '#8b5cf6'}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Main 3D Models Component
function FloatingModels({ userType }) {
  const groupRef = useRef()
  const sphere1Ref = useRef()
  const sphere2Ref = useRef()
  const torusRef = useRef()
  const boxRef = useRef()
  const octahedronRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(t * 0.3) * 3
      sphere1Ref.current.position.y = Math.cos(t * 0.2) * 2
      sphere1Ref.current.rotation.x = t * 0.2
      sphere1Ref.current.rotation.y = t * 0.3
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(t * 0.4) * 4
      sphere2Ref.current.position.z = Math.sin(t * 0.3) * 3
      sphere2Ref.current.rotation.x = -t * 0.2
      sphere2Ref.current.rotation.z = t * 0.1
    }

    if (torusRef.current) {
      torusRef.current.position.y = Math.sin(t * 0.5) * 1.5
      torusRef.current.position.x = Math.cos(t * 0.3) * 2
      torusRef.current.rotation.x = t * 0.4
      torusRef.current.rotation.y = t * 0.2
    }

    if (boxRef.current) {
      boxRef.current.position.x = Math.sin(t * 0.6) * 2.5
      boxRef.current.position.z = Math.cos(t * 0.4) * 2
      boxRef.current.rotation.x = t * 0.3
      boxRef.current.rotation.y = t * 0.2
      boxRef.current.rotation.z = t * 0.1
    }

    if (octahedronRef.current) {
      octahedronRef.current.position.y = Math.cos(t * 0.7) * 2.5
      octahedronRef.current.position.z = Math.sin(t * 0.5) * 2
      octahedronRef.current.rotation.x = t * 0.25
      octahedronRef.current.rotation.y = -t * 0.15
    }
  })

  const primaryColor = userType === 'student' ? '#3b82f6' : '#8b5cf6'
  const secondaryColor = '#10b981'
  const accentColor = '#f59e0b'

  return (
    <group ref={groupRef}>
      {/* Large Distorted Sphere - Main focal point */}
      <mesh ref={sphere1Ref} position={[-6, 0, -8]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color={primaryColor}
          transparent
          opacity={0.15}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Secondary Sphere with wireframe */}
      <mesh ref={sphere2Ref} position={[8, 2, -10]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial
          color={secondaryColor}
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>

      {/* Torus Ring */}
      <mesh ref={torusRef} position={[0, 4, -12]}>
        <torusGeometry args={[1.5, 0.4, 16, 32]} />
        <MeshDistortMaterial
          color={accentColor}
          transparent
          opacity={0.12}
          distort={0.2}
          speed={1.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Rotating Box */}
      <mesh ref={boxRef} position={[5, -3, -6]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color={primaryColor}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Octahedron */}
      <mesh ref={octahedronRef} position={[-4, 3, -5]}>
        <octahedronGeometry args={[1]} />
        <MeshDistortMaterial
          color={userType === 'recruiter' ? primaryColor : secondaryColor}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={1.8}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}

// Complex Geometric Structure
function GeometricStructure({ userType }) {
  const structureRef = useRef()
  const elementsRef = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (structureRef.current) {
      structureRef.current.rotation.y = t * 0.02
      structureRef.current.rotation.x = Math.sin(t * 0.05) * 0.1
    }

    elementsRef.current.forEach((element, index) => {
      if (element) {
        element.rotation.x = t * (0.1 + index * 0.05)
        element.rotation.y = t * (0.05 + index * 0.03)
        element.position.y = Math.sin(t + index) * 0.5
      }
    })
  })

  const primaryColor = userType === 'student' ? '#3b82f6' : '#8b5cf6'

  return (
    <group ref={structureRef} position={[0, 0, -15]}>
      {/* Create a complex geometric structure */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 5
        return (
          <mesh
            key={i}
            ref={(el) => (elementsRef.current[i] = el)}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * 2,
              Math.sin(angle) * radius
            ]}
          >
            <tetrahedronGeometry args={[0.3]} />
            <meshStandardMaterial
              color={primaryColor}
              transparent
              opacity={0.08}
              wireframe={i % 2 === 0}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Network connections between models
function NetworkConnections() {
  const connectionsRef = useRef()

  useFrame((state) => {
    if (connectionsRef.current) {
      connectionsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  const connectionPoints = [
    [-6, 0, -8], [8, 2, -10], [0, 4, -12], 
    [5, -3, -6], [-4, 3, -5], [0, 0, -15]
  ]

  return (
    <group ref={connectionsRef}>
      {connectionPoints.map((point, index) => (
        connectionPoints.slice(index + 1).map((nextPoint, nextIndex) => {
          const distance = Math.sqrt(
            Math.pow(point[0] - nextPoint[0], 2) +
            Math.pow(point[1] - nextPoint[1], 2) +
            Math.pow(point[2] - nextPoint[2], 2)
          )
          
          if (distance < 12) {
            return (
              <line key={`${index}-${nextIndex}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([...point, ...nextPoint])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color="#10b981"
                  transparent
                  opacity={0.1}
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

// Main Enhanced 3D Background Component
export default function Enhanced3DBackground({ userType }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color={userType === 'student' ? '#3b82f6' : '#8b5cf6'} />
        <spotLight 
          position={[0, 20, 0]} 
          intensity={0.5} 
          angle={0.15} 
          penumbra={1} 
          color="#10b981"
        />

        {/* 3D Components */}
        <AnimatedParticles userType={userType} />
        <FloatingModels userType={userType} />
        <GeometricStructure userType={userType} />
        <NetworkConnections />

        {/* Fog for depth */}
        <fog attach="fog" args={['#030712', 10, 50]} />
      </Canvas>
    </div>
  )
}