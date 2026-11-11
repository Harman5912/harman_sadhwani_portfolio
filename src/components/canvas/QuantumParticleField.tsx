import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

export default function QuantumParticleField({ scrollProgress, mouse }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  // 3,200 Interactive Orbiting Golden Stardust Particles
  const { positions, basePositions, colors, angles, speeds, radii, heights } = useMemo(() => {
    const count = 3200;
    const pos = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const ang = new Float32Array(count);
    const spd = new Float32Array(count);
    const rad = new Float32Array(count);
    const hgt = new Float32Array(count);

    const palette = [
      new THREE.Color('#FFD768'), // Brilliant Gold
      new THREE.Color('#FFF6DB'), // Ivory White
      new THREE.Color('#F2E2BA'), // Champagne
      new THREE.Color('#7AC7FF'), // Diamond Cyan Shimmer
      new THREE.Color('#E5B84A'), // Amber Gold
    ];

    for (let i = 0; i < count; i++) {
      ang[i] = Math.random() * Math.PI * 2;
      spd[i] = (Math.random() * 0.45 + 0.12) * (Math.random() > 0.5 ? 1 : -1);
      rad[i] = 1.4 + Math.random() * 5.2;
      hgt[i] = (Math.random() - 0.5) * 5.0;

      const x = Math.cos(ang[i]) * rad[i];
      const y = hgt[i];
      const z = Math.sin(ang[i]) * rad[i];

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, basePositions: basePos, colors: col, angles: ang, speeds: spd, radii: rad, heights: hgt };
  }, []);

  // 1,400 Volumetric Deep Cosmos Particles
  const { nebulaPositions, nebulaColors } = useMemo(() => {
    const count = 1400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const bright = Math.random() * 0.7 + 0.3;
      col[i * 3] = 0.95 * bright;
      col[i * 3 + 1] = 0.88 * bright;
      col[i * 3 + 2] = 0.65 * bright;
    }

    return { nebulaPositions: pos, nebulaColors: col };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const count = angles.length;

      const scrollExpansion = 1 + scrollProgress * 1.1;

      // Project mouse into 3D approximate plane
      const mouseX = mouse.x * 3.5;
      const mouseY = -mouse.y * 2.5;

      for (let i = 0; i < count; i++) {
        angles[i] += delta * speeds[i] * 0.6;
        const currentRad = radii[i] * scrollExpansion;

        let px = Math.cos(angles[i]) * currentRad;
        let py = heights[i] + Math.sin(time * 0.9 + angles[i]) * 0.3;
        let pz = Math.sin(angles[i]) * currentRad;

        // Interactive Mouse Force Field: Repulsion when cursor comes close
        const dx = px - mouseX;
        const dy = py - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 2.5 && distSq > 0.01) {
          const force = (2.5 - Math.sqrt(distSq)) * 0.35;
          px += dx * force;
          py += dy * force;
          pz += force * 0.5;
        }

        posAttr.setXYZ(i, px, py, pz);
      }
      posAttr.needsUpdate = true;

      // Parallax Tilt
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        mouse.x * 0.35 + time * 0.035,
        0.05
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -mouse.y * 0.22,
        0.05
      );
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = -time * 0.012;
      nebulaRef.current.position.y = Math.sin(time * 0.25) * 0.5;
    }
  });

  return (
    <group>
      {/* 1. Orbiting High-Luminance Stardust (Triggering Bloom Halos) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.048}
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Deep Cosmos Volumetric Nebula */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
