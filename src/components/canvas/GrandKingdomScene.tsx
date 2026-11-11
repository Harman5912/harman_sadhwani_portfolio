import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CrystallineCenterpiece from './CrystallineCenterpiece';
import ParticleCosmos from './ParticleCosmos';
import CameraController from './CameraController';

interface SceneProps {
  scrollProgress: number; // 0 to 1
}

export default function GrandKingdomScene({ scrollProgress }: SceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for WebGL capability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Smooth mouse move listener for parallax
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
      {/* Background Radial Ambient Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-amber-600/10 via-yellow-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45, near: 0.1, far: 80 }}
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
        <fogExp2 attach="fog" args={['#07080B', 0.052]} />

        {/* Cinematic Environmental Lighting */}
        <ambientLight intensity={0.9} color="#181A24" />
        {/* Main Golden Celestial Sun Key Light */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={2.8}
          color="#FFF2D1"
        />
        {/* Secondary Warm Rim Accent */}
        <directionalLight
          position={[-6, -4, -4]}
          intensity={1.2}
          color="#D4AF37"
        />
        {/* Cool Atmospheric Sapphire Fill for cinematic contrast */}
        <directionalLight
          position={[-4, 6, 2]}
          intensity={0.8}
          color="#7AB8FF"
        />

        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} mouse={mouse} />
          <CrystallineCenterpiece scrollProgress={scrollProgress} mouse={mouse} />
          <ParticleCosmos scrollProgress={scrollProgress} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
