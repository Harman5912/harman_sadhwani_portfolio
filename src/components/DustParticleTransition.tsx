import React, { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface DustParticleTransitionProps {
  isTransitioning: boolean;
  phase: 'idle' | 'disintegrating' | 'assembling';
  onMidpoint?: () => void;
  onComplete?: () => void;
}

export default function DustParticleTransition({
  isTransitioning,
  phase,
}: DustParticleTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<DustParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const goldColors = [
    '#FFFDF0', // Radiant White Gold
    '#F5E4B5', // Champagne
    '#D4AF37', // Pure Gold
    '#FFD768', // Luminous Yellow
    '#E5C378', // Soft Gold
    '#7AC7FF', // Subtle Diamond Spark
  ];

  // Spawn disintegration particles
  const spawnDisintegrateParticles = (width: number, height: number) => {
    const count = 650;
    const particles: DustParticle[] = [];

    // Center area of content
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const spreadW = width * 0.7;
    const spreadH = height * 0.65;

    for (let i = 0; i < count; i++) {
      const px = centerX + (Math.random() - 0.5) * spreadW;
      const py = centerY + (Math.random() - 0.5) * spreadH;

      // Burst outward from center with upward drift
      const angle = Math.atan2(py - centerY, px - centerX) + (Math.random() - 0.5) * 0.8;
      const speed = Math.random() * 7 + 3;

      particles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3.5, // float upward like embers
        size: Math.random() * 3.5 + 1.2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        alpha: 1.0,
        life: 0,
        maxLife: Math.random() * 25 + 20,
      });
    }

    particlesRef.current = particles;
  };

  // Spawn assembly particles converging inward
  const spawnAssembleParticles = (width: number, height: number) => {
    const count = 650;
    const particles: DustParticle[] = [];
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const spreadW = width * 0.65;
    const spreadH = height * 0.6;

    for (let i = 0; i < count; i++) {
      // Spawn on outer perimeter
      const targetX = centerX + (Math.random() - 0.5) * spreadW;
      const targetY = centerY + (Math.random() - 0.5) * spreadH;

      const spawnAngle = Math.random() * Math.PI * 2;
      const spawnDist = Math.max(width, height) * (0.4 + Math.random() * 0.3);

      const startX = centerX + Math.cos(spawnAngle) * spawnDist;
      const startY = centerY + Math.sin(spawnAngle) * spawnDist;

      // Velocity towards target
      const dx = targetX - startX;
      const dy = targetY - startY;
      const duration = 28;

      particles.push({
        x: startX,
        y: startY,
        vx: dx / duration,
        vy: dy / duration,
        size: Math.random() * 3.2 + 1.0,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        alpha: 0.1,
        life: 0,
        maxLife: duration,
      });
    }

    particlesRef.current = particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (phase === 'disintegrating') {
      spawnDisintegrateParticles(canvas.width, canvas.height);
    } else if (phase === 'assembling') {
      spawnAssembleParticles(canvas.width, canvas.height);
    } else {
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (phase === 'disintegrating') {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha = Math.max(0, 1.0 - p.life / p.maxLife);
        } else if (phase === 'assembling') {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = Math.min(1.0, (p.life / p.maxLife) * 1.5);
        }

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        // Draw glowing particle ember
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    renderLoop();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 ${
        isTransitioning ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
