"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceTier, usePrefersReducedMotion } from "@/components/hooks";

/** True only on the client after hydration — avoids mounting WebGL during SSR. */
function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface NetworkGeometry {
  positions: Float32Array;
  edgePositions: Float32Array;
}

function buildGeometry(count: number): NetworkGeometry {
  const pos: number[] = [];
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  for (let i = 0; i < count; i++) {
    pos.push(rand(-9, 9), rand(-5.5, 5.5), rand(-4, 4));
  }
  const edgeIdx: number[] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < 2.4) edgeIdx.push(i, j);
    }
  }
  const edgePos = new Float32Array(edgeIdx.length * 3);
  for (let k = 0; k < edgeIdx.length; k++) {
    const idx = edgeIdx[k] * 3;
    edgePos[k * 3] = pos[idx];
    edgePos[k * 3 + 1] = pos[idx + 1];
    edgePos[k * 3 + 2] = pos[idx + 2];
  }
  return { positions: new Float32Array(pos), edgePositions: edgePos };
}

/** Single shared Three.js scene — the gold neural network lattice behind the hero. */
function Network({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  // Lazy state initializer: random geometry is generated once per mount (remount via key on count change).
  const [{ positions, edgePositions }] = useState(() => buildGeometry(count));

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.07;
    const cam = state.camera;
    cam.position.x += (mouse.current.x * 1.3 - cam.position.x) * 0.035;
    cam.position.y += (mouse.current.y * 0.9 - cam.position.y) * 0.035;
    cam.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <group ref={group}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.085}
          color="#D4AF37"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      {/* Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.05} depthWrite={false} />
      </mesh>
      {/* Ambient gold dust */}
      <Sparkles count={60} scale={[15, 9, 6]} size={2.4} speed={0.35} color="#e8c15a" opacity={0.5} />
      <Sparkles count={28} scale={[10, 6, 4]} size={4.2} speed={0.2} color="#b8860b" opacity={0.35} />
    </group>
  );
}

/** Full-viewport gold neural network background. Renders nothing when reduced motion is preferred. */
export default function NeuralNetworkCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const isClient = useIsClient();
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "240px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!isClient || reduce) return null;

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
      >
        <Network key={tier} count={tier === "low" ? 70 : 130} />
      </Canvas>
    </div>
  );
}
