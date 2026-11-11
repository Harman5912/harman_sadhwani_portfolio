import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleCosmosProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

export default function ParticleCosmos({ scrollProgress, mouse }: ParticleCosmosProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const nebulaPointsRef = useRef<THREE.Points>(null);

  // Generate 2400 Golden Orbiting Stardust Particles
  const { positions, colors, scales, angles, speeds, radii, heights } = useMemo(() => {
    const count = 2400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const ang = new Float32Array(count);
    const spd = new Float32Array(count);
    const rad = new Float32Array(count);
    const hgt = new Float32Array(count);

    const goldPalette = [
      new THREE.Color('#D4AF37'), // Classic Gold
      new THREE.Color('#FFF6DB'), // Ivory White
      new THREE.Color('#F2E2BA'), // Champagne
      new THREE.Color('#E5C378'), // Pale Gold
    ];

    for (let i = 0; i < count; i++) {
      ang[i] = Math.random() * Math.PI * 2;
      spd[i] = (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1);
      rad[i] = 1.2 + Math.random() * 4.5;
      hgt[i] = (Math.random() - 0.5) * 4.0;

      pos[i * 3] = Math.cos(ang[i]) * rad[i];
      pos[i * 3 + 1] = hgt[i];
      pos[i * 3 + 2] = Math.sin(ang[i]) * rad[i];

      const c = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      scl[i] = Math.random() * 2.5 + 0.8;
    }

    return { positions: pos, colors: col, scales: scl, angles: ang, speeds: spd, radii: rad, heights: hgt };
  }, []);

  // Generate 1200 Volumetric Outer Nebula Dust Particles
  const { nebulaPositions, nebulaColors } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const alpha = Math.random() * 0.6 + 0.4;
      col[i * 3] = 0.9 * alpha;
      col[i * 3 + 1] = 0.85 * alpha;
      col[i * 3 + 2] = 0.6 * alpha;
    }

    return { nebulaPositions: pos, nebulaColors: col };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const count = angles.length;

      // React to scroll: expand/contract swirl
      const scrollExpansion = 1 + scrollProgress * 0.8;

      for (let i = 0; i < count; i++) {
        angles[i] += delta * speeds[i] * 0.5;
        const currentRad = radii[i] * scrollExpansion;

        posAttr.setXYZ(
          i,
          Math.cos(angles[i]) * currentRad,
          heights[i] + Math.sin(time * 0.8 + angles[i]) * 0.25,
          Math.sin(angles[i]) * currentRad
        );
      }
      posAttr.needsUpdate = true;

      // Mouse Parallax on particle system
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        mouse.x * 0.35 + time * 0.04,
        0.05
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -mouse.y * 0.2,
        0.05
      );
    }

    if (nebulaPointsRef.current) {
      nebulaPointsRef.current.rotation.y = -time * 0.015;
      nebulaPointsRef.current.position.y = Math.sin(time * 0.2) * 0.4;
    }
  });

  return (
    <group>
      {/* Inner Swirling Gold Stardust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Volumetric Outer Deep Space Dust */}
      <points ref={nebulaPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nebulaPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nebulaColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
