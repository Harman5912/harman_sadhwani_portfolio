import { useEffect, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface PostProcessingProps {
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
}

export default function PostProcessingPipeline({
  bloomStrength = 1.35,
  bloomRadius = 0.55,
  bloomThreshold = 0.22,
}: PostProcessingProps) {
  const { gl, scene, camera, size } = useThree();

  const [composer, bloomPass] = useMemo(() => {
    const comp = new EffectComposer(gl);
    comp.renderToScreen = true;

    const renderPass = new RenderPass(scene, camera);
    comp.addPass(renderPass);

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    comp.addPass(bloom);

    const outputPass = new OutputPass();
    comp.addPass(outputPass);

    return [comp, bloom];
  }, [gl, scene, camera]);

  // Handle dynamic resize
  useEffect(() => {
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bloomPass.resolution.set(size.width, size.height);
  }, [size, composer, bloomPass]);

  // Update bloom params if changed
  useEffect(() => {
    bloomPass.strength = bloomStrength;
    bloomPass.radius = bloomRadius;
    bloomPass.threshold = bloomThreshold;
  }, [bloomStrength, bloomRadius, bloomThreshold, bloomPass]);

  // Hook into R3F render loop (priority 1 ensures it executes after scene updates)
  useFrame(() => {
    composer.render();
  }, 1);

  return null;
}
