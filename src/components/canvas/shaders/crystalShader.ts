import * as THREE from 'three';

export const CrystalFresnelShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color('#D4AF37') },
    uColorRim: { value: new THREE.Color('#FFF6DB') },
    uColorAccent: { value: new THREE.Color('#7AC7FF') },
    uFresnelPower: { value: 2.2 },
    uOpacity: { value: 0.88 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying float vFresnel;

    uniform float uFresnelPower;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

      vec3 viewDir = normalize(vViewPosition);
      vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);

      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorRim;
    uniform vec3 uColorAccent;
    uniform float uOpacity;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying float vFresnel;

    void main() {
      float pulse = sin(vWorldPosition.y * 3.5 - uTime * 2.5) * 0.5 + 0.5;
      float microShimmer = sin(vWorldPosition.x * 12.0 + vWorldPosition.z * 12.0 + uTime * 3.0) * 0.15;

      vec3 col = mix(uColorBase, uColorAccent, pulse * 0.4);
      col = mix(col, uColorRim, vFresnel * 0.95 + microShimmer);

      vec3 bloomGlow = uColorRim * pow(vFresnel, 1.5) * 1.5;
      vec3 finalColor = col + bloomGlow;

      float alpha = clamp(uOpacity * (0.6 + vFresnel * 0.4), 0.0, 1.0);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

export const LightBeamShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#FFDF85') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Gentle atmospheric vertical beam with non-intrusive transparency
      float verticalFade = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
      float shimmer = sin(vUv.y * 16.0 - uTime * 3.0) * 0.12 + 0.88;
      float alpha = verticalFade * shimmer * 0.18; // Softened to avoid blinding text

      gl_FragColor = vec4(uColor * 1.2, alpha);
    }
  `,
};
