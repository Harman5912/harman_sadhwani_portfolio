import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CrystallineMonument from './CrystallineMonument';
import QuantumParticleField from './QuantumParticleField';
import CameraController from './CameraController';
import PostProcessingPipeline from './PostProcessingPipeline';

interface SceneProps {
  scrollProgress: number; // 0 to 1
  sceneMode?: 'cinematic' | 'wireframe' | 'quantum';
}

export default function GrandKingdomScene({ scrollProgress, sceneMode = 'wireframe' }: SceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for WebGL capability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Smooth mouse move listener for parallax and particle repulsion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#07080B] via-[#0E1017] to-[#07080B] flex items-center justify-center">
        <div className="text-center p-8 max-w-md border border-amber-500/20 rounded-2xl bg-black/60 backdrop-blur-xl">
          <p className="font-serif text-amber-200/90 text-sm tracking-widest uppercase">Harman Sadhwani</p>
          <p className="text-xs text-gray-400 mt-2">Interactive background unavailable on this device.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080B]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45, near: 0.1, far: 90 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Volumetric Exponential Fog */}
        <fogExp2 attach="fog" args={['#07080B', 0.05]} />

        {/* Cinematic Environmental Lighting */}
        <ambientLight intensity={0.9} color="#181A24" />
        {/* Golden Key Light */}
        <directionalLight position={[7, 10, 6]} intensity={2.8} color="#FFF2D1" />
        {/* Warm Golden Counter-Fill */}
        <directionalLight position={[-7, -4, -4]} intensity={1.2} color="#D4AF37" />
        {/* Sapphire Atmospheric Rim Fill */}
        <directionalLight position={[-5, 7, 3]} intensity={0.9} color="#7AB8FF" />

        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} mouse={mouse} />
          <CrystallineMonument
            scrollProgress={scrollProgress}
            mouse={mouse}
            activeMode={sceneMode}
          />
          <QuantumParticleField scrollProgress={scrollProgress} mouse={mouse} />
          {/* Calibrated Bloom: Higher threshold prevents glare from blowing out headings */}
          <PostProcessingPipeline
            bloomStrength={0.75}
            bloomRadius={0.45}
            bloomThreshold={0.52}
          />
        </Suspense>
      </Canvas>

      {/* Central Deep Contrast Vignette Layer - Guarantees 100% heading legibility over 3D objects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,8,11,0.52)_0%,rgba(7,8,11,0.22)_50%,rgba(7,8,11,0.85)_100%)] pointer-events-none z-10" />
    </div>
  );
}
