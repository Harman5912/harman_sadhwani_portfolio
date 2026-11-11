import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CrystalFresnelShader, LightBeamShader } from './shaders/crystalShader';

interface MonumentProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
  activeMode?: 'cinematic' | 'wireframe' | 'quantum';
}

export default function CrystallineMonument({
  scrollProgress,
  mouse,
  activeMode = 'cinematic',
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

  // Custom Shader Materials
  const fresnelMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(CrystalFresnelShader.uniforms),
      vertexShader: CrystalFresnelShader.vertexShader,
      fragmentShader: CrystalFresnelShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

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

  // Champagne Gold Metallic PBR Material
  const goldPBR = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        metalness: 0.96,
        roughness: 0.12,
        emissive: new THREE.Color('#553B00'),
        emissiveIntensity: 0.35,
      }),
    []
  );

  // Intense Luminous Core Material
  const coreLuminousMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFF8E7'),
        emissive: new THREE.Color('#FFD768'),
        emissiveIntensity: 4.5,
        roughness: 0.05,
        metalness: 0.1,
      }),
    []
  );

  // 8 Satellite Floating Obelisks
  const obeliskPositions = useMemo(() => {
    const count = 8;
    const radius = 2.8;
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

    // Update Shader Uniforms
    fresnelMat.uniforms.uTime.value = time;
    beamMat.uniforms.uTime.value = time;

    // Master Group Floating & Parallax
    if (masterGroupRef.current) {
      masterGroupRef.current.position.y = Math.sin(time * 0.75) * 0.15;

      const targetRotY = mouse.x * 0.32 + scrollProgress * Math.PI * 2.0;
      const targetRotX = -mouse.y * 0.2 + Math.sin(time * 0.4) * 0.04;

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
      const pulse = 1 + Math.sin(time * 4.0) * 0.14;
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

    // Dynamic Scroll Expansion: The sanctuary expands like an astrolabe flower
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
      {/* 1. Volumetric Celestial Ascension Beam */}
      <mesh ref={beamRef} position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.3, 0.75, 14, 32, 1, true]} />
        <primitive object={beamMat} attach="material" />
      </mesh>

      {/* 2. Intense Luminous Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <primitive object={coreLuminousMat} attach="material" />
      </mesh>

      {/* 3. Inner Sacred Geometry: Dodecahedron with Gold Facets */}
      <mesh ref={innerPolyRef}>
        <dodecahedronGeometry args={[1.0, 0]} />
        {activeMode === 'wireframe' ? (
          <meshBasicMaterial color="#FFDF85" wireframe />
        ) : (
          <primitive object={goldPBR} attach="material" />
        )}
      </mesh>

      {/* 4. Outer Crystalline Hyper-Structure: Icosahedron with Custom Fresnel Shimmer */}
      <mesh ref={outerPolyRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        {activeMode === 'wireframe' ? (
          <meshBasicMaterial color="#7AC7FF" wireframe />
        ) : (
          <primitive object={fresnelMat} attach="material" />
        )}
      </mesh>

      {/* 5. Delicate Gold Wireframe Lattice Envelope */}
      <mesh>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#FFD768" wireframe transparent opacity={0.22} />
      </mesh>

      {/* 6. Celestial Ring 1: Heavy Primary Astrolabe (Champagne Gold) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.042, 16, 120]} />
          <primitive object={goldPBR} attach="material" />
        </mesh>
        {/* Ring Node Jewels */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, i) => (
          <mesh key={i} position={[Math.cos(ang) * 2.0, Math.sin(ang) * 2.0, 0]}>
            <octahedronGeometry args={[0.08, 0]} />
            <primitive object={coreLuminousMat} attach="material" />
          </mesh>
        ))}
      </group>

      {/* 7. Celestial Ring 2: Tilted Gyroscope Ring */}
      <group ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.35, 0.03, 16, 120]} />
          <primitive object={goldPBR} attach="material" />
        </mesh>
        <mesh position={[2.35, 0, 0]}>
          <dodecahedronGeometry args={[0.09, 0]} />
          <primitive object={fresnelMat} attach="material" />
        </mesh>
        <mesh position={[-2.35, 0, 0]}>
          <dodecahedronGeometry args={[0.09, 0]} />
          <primitive object={fresnelMat} attach="material" />
        </mesh>
      </group>

      {/* 8. Celestial Ring 3: Outer Horizon Ring */}
      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.7, 0.025, 16, 120]} />
          <primitive object={goldPBR} attach="material" />
        </mesh>
      </group>

      {/* 9. Celestial Ring 4: Fine Outer Metric Ring with Tick Geometry */}
      <group ref={ring4Ref} rotation={[0, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.05, 0.015, 16, 120]} />
          <primitive object={goldPBR} attach="material" />
        </mesh>
      </group>

      {/* 10. Satellite Floating Obelisks (The Pillars of the Digital Kingdom) */}
      <group ref={obelisksGroupRef}>
        {obeliskPositions.map((ob, idx) => (
          <group key={idx} position={ob.pos} rotation={ob.rot}>
            <mesh position={[0, Math.sin(idx + 1) * 0.4, 0]}>
              <cylinderGeometry args={[0.07, 0.12, 2.6, 6]} />
              <primitive object={idx % 2 === 0 ? goldPBR : fresnelMat} attach="material" />
            </mesh>
            {/* Glowing Cap Jewel */}
            <mesh position={[0, 1.4 + Math.sin(idx + 1) * 0.4, 0]}>
              <octahedronGeometry args={[0.08, 0]} />
              <primitive object={coreLuminousMat} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 11. Holographic Ground Pedestal & Caustic Grid */}
      <group ref={groundGridRef} position={[0, -2.6, 0]}>
        {/* Concentric Neon Rings */}
        {[1.6, 2.8, 4.0, 5.5].map((r, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r, r + 0.025, 64]} />
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.35 - i * 0.06}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* 12. Point Light Emitters radiating through bloom */}
      <pointLight color="#FFE8A3" intensity={4.5} distance={8} decay={2} />
      <pointLight color="#7AC7FF" intensity={2.0} distance={6} decay={2} position={[0, 1.6, 0]} />
      <pointLight color="#FF9D2E" intensity={1.8} distance={5} decay={2} position={[0, -1.6, 0]} />
    </group>
  );
}
