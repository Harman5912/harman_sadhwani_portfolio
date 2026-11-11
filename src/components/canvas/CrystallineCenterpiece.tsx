import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CenterpieceProps {
  scrollProgress: number; // 0 to 1
  mouse: { x: number; y: number };
}

export default function CrystallineCenterpiece({ scrollProgress, mouse }: CenterpieceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const pillarsGroupRef = useRef<THREE.Group>(null);

  // Champagne Gold Physical Material
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        metalness: 0.92,
        roughness: 0.18,
        emissive: new THREE.Color('#664400'),
        emissiveIntensity: 0.25,
      }),
    []
  );

  // Translucent Crystalline Material
  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFFFFF'),
        transmission: 0.88,
        opacity: 1,
        transparent: true,
        roughness: 0.08,
        ior: 1.55,
        thickness: 1.5,
        metalness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        attenuationColor: new THREE.Color('#F6E2B3'),
        attenuationDistance: 1.2,
      }),
    []
  );

  // Glowing Core Material
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFF6DB'),
        emissive: new THREE.Color('#FFD770'),
        emissiveIntensity: 2.2,
        roughness: 0.1,
        metalness: 0.1,
      }),
    []
  );

  // Architectural Pillar Geometry (Hexagonal prisms)
  const pillarGeo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.12, 3.2, 6), []);
  const pillarPositions = useMemo(() => {
    const count = 6;
    const positions: [number, number, number][] = [];
    const radius = 2.4;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating oscillation
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.12;

      // Mouse parallax reaction
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.25 + scrollProgress * Math.PI * 1.5,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.15 + Math.sin(time * 0.3) * 0.05,
        0.05
      );
    }

    // Inner Crystal Rotation
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.45;
      crystalRef.current.rotation.x += delta * 0.25;
      const crystalScale = 1 + Math.sin(time * 1.5) * 0.04 + (1 - scrollProgress * 0.3);
      crystalRef.current.scale.setScalar(crystalScale);
    }

    // Glowing Core Breathing
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }

    // Outer Celestial Rings with Counter-Rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.28;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35;
      ring2Ref.current.rotation.z += delta * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.22;
      ring3Ref.current.rotation.y += delta * 0.18;
    }

    // Dynamic reaction to scroll: expand/contract architecture
    if (pillarsGroupRef.current) {
      const expansion = 1 + Math.sin(scrollProgress * Math.PI) * 0.4;
      pillarsGroupRef.current.scale.set(expansion, 1 + scrollProgress * 0.2, expansion);
      pillarsGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Luminous Energy Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <primitive object={coreMaterial} attach="material" />
      </mesh>

      {/* Intricate Inner Crystalline Hyper-Structure */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[1.3, 0]} />
        <primitive object={crystalMaterial} attach="material" />
      </mesh>

      {/* Outer Wireframe / Geometric Facet Accent */}
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#FFDF85" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Primary Celestial Gyroscope Ring (Champagne Gold) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.9, 0.035, 16, 100]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        {/* Ring Orbiting Node Jewels */}
        <mesh position={[1.9, 0, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <primitive object={crystalMaterial} attach="material" />
        </mesh>
        <mesh position={[-1.9, 0, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <primitive object={crystalMaterial} attach="material" />
        </mesh>
      </group>

      {/* Secondary Tilted Architectural Ring */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.028, 16, 100]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -2.2, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
      </group>

      {/* Tertiary Outer Astrolabe Ring */}
      <group ref={ring3Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.02, 16, 100]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
      </group>

      {/* Architectural Crystalline Spires (Sanctuary Pillars) */}
      <group ref={pillarsGroupRef}>
        {pillarPositions.map((pos, idx) => (
          <mesh key={idx} position={pos} geometry={pillarGeo}>
            <primitive object={idx % 2 === 0 ? goldMaterial : crystalMaterial} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Point Light emitted from within the crystal core */}
      <pointLight color="#FFE6A3" intensity={3.5} distance={7} decay={2} />
      <pointLight color="#7AB8FF" intensity={1.2} distance={5} decay={2} position={[0, 1.5, 0]} />
    </group>
  );
}
