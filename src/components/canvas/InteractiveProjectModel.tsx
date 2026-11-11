import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectModelProps {
  type: 'monolith' | 'crystal' | 'prism' | 'sphere' | 'torus';
  isHovered?: boolean;
}

export default function InteractiveProjectModel({ type, isHovered = false }: ProjectModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        metalness: 0.95,
        roughness: 0.15,
        emissive: new THREE.Color('#4D3300'),
        emissiveIntensity: 0.2,
      }),
    []
  );

  const crystalMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFFFFF'),
        transmission: 0.9,
        transparent: true,
        opacity: 0.95,
        roughness: 0.05,
        ior: 1.5,
        thickness: 1.2,
        attenuationColor: new THREE.Color('#F2E2BA'),
        attenuationDistance: 1.0,
      }),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = isHovered ? 1.5 : 0.6;
      meshRef.current.rotation.y += delta * speed;
      if (isHovered) {
        meshRef.current.rotation.x += delta * 0.4;
      }
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
      ringRef.current.rotation.x += delta * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.9;
    }
  });

  return (
    <group ref={meshRef}>
      {type === 'monolith' && (
        <group>
          {/* Central Monolith */}
          <mesh>
            <boxGeometry args={[0.9, 1.8, 0.45]} />
            <primitive object={crystalMat} attach="material" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.94, 1.84, 0.49]} />
            <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.25} />
          </mesh>
          {/* Inner Golden Core */}
          <mesh ref={innerRef}>
            <octahedronGeometry args={[0.3, 0]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
          {/* Orbiting Scanning Ring */}
          <mesh ref={ringRef}>
            <torusGeometry args={[1.3, 0.02, 16, 60]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
        </group>
      )}

      {type === 'crystal' && (
        <group>
          {/* Crown Code Faceted Polyhedron */}
          <mesh>
            <dodecahedronGeometry args={[1.05, 0]} />
            <primitive object={crystalMat} attach="material" />
          </mesh>
          <mesh>
            <dodecahedronGeometry args={[1.1, 0]} />
            <meshBasicMaterial color="#F5E4B5" wireframe transparent opacity={0.3} />
          </mesh>
          <mesh ref={innerRef}>
            <icosahedronGeometry args={[0.45, 0]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
          <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.4, 0.025, 16, 64]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
        </group>
      )}

      {type === 'prism' && (
        <group>
          {/* ReviewBOT Diagnostic Prism */}
          <mesh>
            <octahedronGeometry args={[1.15, 0]} />
            <primitive object={crystalMat} attach="material" />
          </mesh>
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.25} />
          </mesh>
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.38, 24, 24]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
          <mesh ref={ringRef} rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.5, 0.02, 16, 64]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
        </group>
      )}

      {type === 'sphere' && (
        <group>
          <mesh>
            <icosahedronGeometry args={[1.0, 2]} />
            <primitive object={crystalMat} attach="material" />
          </mesh>
          <mesh ref={innerRef}>
            <octahedronGeometry args={[0.5, 0]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
        </group>
      )}

      {type === 'torus' && (
        <group>
          <mesh>
            <torusKnotGeometry args={[0.75, 0.22, 90, 16]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <primitive object={crystalMat} attach="material" />
          </mesh>
        </group>
      )}
    </group>
  );
}
