import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress: number; // 0 to 1
  mouse: { x: number; y: number };
}

export default function CameraController({ scrollProgress, mouse }: CameraControllerProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 7.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Determine target camera waypoint based on scrollProgress
    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();

    if (scrollProgress < 0.15) {
      // Stage 0: Hero
      const t = scrollProgress / 0.15;
      targetPos.set(
        THREE.MathUtils.lerp(0, -0.8, t),
        THREE.MathUtils.lerp(0, 0.4, t),
        THREE.MathUtils.lerp(7.2, 6.8, t)
      );
      targetLook.set(0, 0, 0);
    } else if (scrollProgress < 0.35) {
      // Stage 1: About Me
      const t = (scrollProgress - 0.15) / 0.2;
      targetPos.set(
        THREE.MathUtils.lerp(-0.8, -2.6, t),
        THREE.MathUtils.lerp(0.4, 1.2, t),
        THREE.MathUtils.lerp(6.8, 5.6, t)
      );
      targetLook.set(-0.4, 0.2, 0);
    } else if (scrollProgress < 0.55) {
      // Stage 2: Technical Skills
      const t = (scrollProgress - 0.35) / 0.2;
      targetPos.set(
        THREE.MathUtils.lerp(-2.6, 2.8, t),
        THREE.MathUtils.lerp(1.2, 2.0, t),
        THREE.MathUtils.lerp(5.6, 5.2, t)
      );
      targetLook.set(0.3, 0.4, 0);
    } else if (scrollProgress < 0.75) {
      // Stage 3: Featured Projects
      const t = (scrollProgress - 0.55) / 0.2;
      targetPos.set(
        THREE.MathUtils.lerp(2.8, 0, t),
        THREE.MathUtils.lerp(2.0, -0.6, t),
        THREE.MathUtils.lerp(5.2, 4.5, t)
      );
      targetLook.set(0, 0, 0);
    } else if (scrollProgress < 0.9) {
      // Stage 4: Achievements & Recognition
      const t = (scrollProgress - 0.75) / 0.15;
      targetPos.set(
        THREE.MathUtils.lerp(0, -2.0, t),
        THREE.MathUtils.lerp(-0.6, 0.8, t),
        THREE.MathUtils.lerp(4.5, 5.8, t)
      );
      targetLook.set(-0.2, 0.2, 0);
    } else {
      // Stage 5: Contact & Zenith
      const t = (scrollProgress - 0.9) / 0.1;
      targetPos.set(
        THREE.MathUtils.lerp(-2.0, 0, t),
        THREE.MathUtils.lerp(0.8, -2.4, t),
        THREE.MathUtils.lerp(5.8, 5.0, t)
      );
      targetLook.set(0, 1.6, 0);
    }

    // Apply Subtle Mouse Parallax
    targetPos.x += mouse.x * 0.45;
    targetPos.y += -mouse.y * 0.35;

    // Smooth Damping Lerp
    currentPos.current.lerp(targetPos, 0.045);
    currentLookAt.current.lerp(targetLook, 0.045);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
