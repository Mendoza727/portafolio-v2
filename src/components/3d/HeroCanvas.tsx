"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMouseRef } from "@/hooks/useMouse";

// Animated floating particles field
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null!);
  const mouse = useMouseRef();

  const { positions, count } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return { positions, count };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Slow rotation
    meshRef.current.rotation.x = t * 0.03;
    meshRef.current.rotation.y = t * 0.04 + mouse.current.x * 0.2;

    // Subtle mouse parallax
    meshRef.current.position.x = mouse.current.x * 0.3;
    meshRef.current.position.y = mouse.current.y * 0.2;
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.65}
      />
    </Points>
  );
}

// Floating wireframe sphere
function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouse = useMouseRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.25;
    meshRef.current.position.x = mouse.current.x * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

// Floating ring
function FloatingRing() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2 + 0.5;
    meshRef.current.rotation.z = t * 0.1;
    meshRef.current.position.y = Math.cos(t * 0.4) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[2.5, 0.5, -2]}>
      <torusGeometry args={[1.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <ParticleField />
      <FloatingSphere />
      <FloatingRing />
    </Canvas>
  );
}
