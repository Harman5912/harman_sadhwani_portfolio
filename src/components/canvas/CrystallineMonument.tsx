import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LightBeamShader } from './shaders/crystalShader';

interface MonumentProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
  activeMode?: 'wireframe' | 'cinematic' | 'quantum';
}

export default function CrystallineMonument({
  scrollProgress,
  mouse,
  activeMode = 'wireframe',
}: MonumentProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerPolyRef = useRef<THREE.Mesh>(null);
  const innerPolyRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const ring4Ref = useRef<THREE.Group>(null);
  const obelisksGroupRef = useRef<THREE.Group>(null);
  const groundGridRef = useRef<THREE.Group>(null);

  // Volumetric Wireframe Beam Material
  const beamMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(LightBeamShader.uniforms),
      vertexShader: LightBeamShader.vertexShader,
      fragmentShader: LightBeamShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Luminous Core Material
  const coreLuminousMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFF8E7'),
        emissive: new THREE.Color('#FFD768'),
        emissiveIntensity: 3.5,
        roughness: 0.1,
        metalness: 0.1,
      }),
    []
  );

  // Neon Wireframe Materials
  const goldWireframeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#FFD768'),
        wireframe: true,
        transparent: true,
        opacity: 0.95,
      }),
    []
  );

  const cyanWireframeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#7AC7FF'),
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const fineGridMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#D4AF37'),
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  // 8 Satellite Floating Obelisks
  const obeliskPositions = useMemo(() => {
    const count = 8;
    const radius = 2.9;
    const arr: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        pos: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        rot: [0, -angle, 0],
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    beamMat.uniforms.uTime.value = time;

    // Master Group Floating & Parallax
    if (masterGroupRef.current) {
      masterGroupRef.current.position.y = Math.sin(time * 0.75) * 0.14;

      const targetRotY = mouse.x * 0.35 + scrollProgress * Math.PI * 2.0;
      const targetRotX = -mouse.y * 0.22 + Math.sin(time * 0.4) * 0.04;

      masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        masterGroupRef.current.rotation.y,
        targetRotY,
        0.05
      );
      masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        masterGroupRef.current.rotation.x,
        targetRotX,
        0.05
      );
    }

    // Rotating Nested Polyhedra
    if (outerPolyRef.current) {
      outerPolyRef.current.rotation.y += delta * 0.35;
      outerPolyRef.current.rotation.x += delta * 0.2;
    }
    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.y -= delta * 0.55;
      innerPolyRef.current.rotation.z += delta * 0.3;
    }

    // Core Pulsing
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 4.0) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }

    // 4 Celestial Gyroscope Rings with Counter-Rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
      ring1Ref.current.rotation.x += delta * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.42;
      ring2Ref.current.rotation.z += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.28;
      ring3Ref.current.rotation.y += delta * 0.22;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z += delta * 0.5;
    }

    // Dynamic Scroll Expansion
    const expansion = 1 + Math.sin(scrollProgress * Math.PI) * 0.55;
    if (obelisksGroupRef.current) {
      obelisksGroupRef.current.scale.set(expansion, 1 + scrollProgress * 0.3, expansion);
      obelisksGroupRef.current.rotation.y -= delta * 0.12;
    }

    // Ground Grid subtle rotation
    if (groundGridRef.current) {
      groundGridRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]}>
      {/* 1. Volumetric Ascension Light Beam */}
      <mesh ref={beamRef} position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.25, 0.7, 14, 32, 1, true]} />
        <primitive object={beamMat} attach="material" />
      </mesh>

      {/* 2. Intense Luminous Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <primitive object={coreLuminousMat} attach="material" />
      </mesh>

      {/* 3. Inner Sacred Geometry: Neon Gold Dodecahedron Wireframe */}
      <mesh ref={innerPolyRef}>
        <dodecahedronGeometry args={[1.05, 0]} />
        <primitive object={goldWireframeMat} attach="material" />
      </mesh>

      {/* 4. Outer Sacred Geometry: Electric Cyan Icosahedron Wireframe */}
      <mesh ref={outerPolyRef}>
        <icosahedronGeometry args={[1.52, 1]} />
        <primitive object={cyanWireframeMat} attach="material" />
      </mesh>

      {/* 5. Heavy Outer Wireframe Matrix Shell */}
      <mesh>
        <octahedronGeometry args={[1.85, 1]} />
        <primitive object={goldWireframeMat} attach="material" />
      </mesh>

      {/* 6. Celestial Ring 1: Primary Wireframe Astrolabe Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.05, 0.035, 8, 80]} />
          <primitive object={goldWireframeMat} attach="material" />
        </mesh>
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, i) => (
          <mesh key={i} position={[Math.cos(ang) * 2.05, Math.sin(ang) * 2.05, 0]}>
            <octahedronGeometry args={[0.09, 0]} />
            <primitive object={coreLuminousMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* 7. Celestial Ring 2: Tilted Gyroscope Wireframe */}
      <group ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.4, 0.028, 8, 80]} />
          <primitive object={cyanWireframeMat} attach="material" />
        </mesh>
        <mesh position={[2.4, 0, 0]}>
          <dodecahedronGeometry args={[0.08, 0]} />
          <primitive object={goldWireframeMat} attach="material" />
        </mesh>
        <mesh position={[-2.4, 0, 0]}>
          <dodecahedronGeometry args={[0.08, 0]} />
          <primitive object={goldWireframeMat} attach="material" />
        </mesh>
      </group>

      {/* 8. Celestial Ring 3: Tilted Outer Horizon Ring */}
      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.75, 0.02, 8, 80]} />
          <primitive object={goldWireframeMat} attach="material" />
        </mesh>
      </group>

      {/* 9. Celestial Ring 4: Fine Outer Metric Ring */}
      <group ref={ring4Ref} rotation={[0, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.1, 0.015, 6, 90]} />
          <primitive object={cyanWireframeMat} attach="material" />
        </mesh>
      </group>

      {/* 10. Satellite Floating Wireframe Obelisks */}
      <group ref={obelisksGroupRef}>
        {obeliskPositions.map((ob, idx) => (
          <group key={idx} position={ob.pos} rotation={ob.rot}>
            <mesh position={[0, Math.sin(idx + 1) * 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.14, 2.7, 6]} />
              <primitive object={idx % 2 === 0 ? goldWireframeMat : cyanWireframeMat} attach="material" />
            </mesh>
            <mesh position={[0, 1.45 + Math.sin(idx + 1) * 0.4, 0]}>
              <octahedronGeometry args={[0.08, 0]} />
              <primitive object={coreLuminousMat} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 11. Holographic Cyber Ground Pedestal & Concentric Rings */}
      <group ref={groundGridRef} position={[0, -2.6, 0]}>
        {[1.6, 2.7, 3.9, 5.2].map((r, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r, r + 0.03, 64]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#D4AF37' : '#7AC7FF'}
              transparent
              opacity={0.45 - i * 0.08}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        {/* Radial Spokes */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((ang, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, ang]}>
            <planeGeometry args={[0.02, 10.5]} />
            <primitive object={fineGridMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* 12. Point Lights */}
      <pointLight color="#FFE8A3" intensity={4.5} distance={8} decay={2} />
      <pointLight color="#7AC7FF" intensity={2.8} distance={7} decay={2} position={[0, 1.6, 0]} />
      <pointLight color="#FFD768" intensity={2.5} distance={6} decay={2} position={[0, -1.6, 0]} />
    </group>
  );
}
