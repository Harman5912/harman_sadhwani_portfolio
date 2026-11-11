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

export default function GrandKingdomScene({ scrollProgress, sceneMode = 'cinematic' }: SceneProps) {
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
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="text-center p-8 max-w-md border border-amber-500/20 rounded-2xl bg-black/40 backdrop-blur-xl">
          <p className="font-serif text-amber-200/90 text-sm tracking-widest uppercase">Digital Sanctuary Active</p>
          <p className="text-xs text-gray-400 mt-2">Hardware acceleration fallback rendered smoothly.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080B]">
      {/* Background Radial Ambient Volumetric Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-amber-600/15 via-yellow-500/8 to-transparent blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full bg-amber-400/10 blur-[130px] pointer-events-none" />

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
        <fogExp2 attach="fog" args={['#07080B', 0.048]} />

        {/* Cinematic Environmental Lighting */}
        <ambientLight intensity={1.1} color="#181A24" />
        {/* Golden Sun Key Light */}
        <directionalLight position={[7, 10, 6]} intensity={3.4} color="#FFF2D1" />
        {/* Warm Golden Counter-Fill */}
        <directionalLight position={[-7, -4, -4]} intensity={1.4} color="#D4AF37" />
        {/* Sapphire Atmospheric Rim Fill */}
        <directionalLight position={[-5, 7, 3]} intensity={1.1} color="#7AB8FF" />

        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} mouse={mouse} />
          <CrystallineMonument
            scrollProgress={scrollProgress}
            mouse={mouse}
            activeMode={sceneMode}
          />
          <QuantumParticleField scrollProgress={scrollProgress} mouse={mouse} />
          <PostProcessingPipeline
            bloomStrength={sceneMode === 'wireframe' ? 0.8 : 1.45}
            bloomRadius={0.65}
            bloomThreshold={0.2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
