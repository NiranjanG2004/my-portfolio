import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);

  // Reduced particle count and speed
  const PARTICLE_COUNT = 600; // Reduced count for better performance
  const PARTICLE_SIZE = 0.02;

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({
      alpha: true,
      powerPreference: 'default', // Use default power preference for better compatibility
      antialias: false, // Disable antialiasing for better performance
    });

    // Configure renderer
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create a circular texture for round particles
    function createCircleTexture() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    }

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      // Reduced velocity range for slower movement
      velocities[i] = (Math.random() - 0.5) * 0.004;
      velocities[i + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i + 2] = (Math.random() - 0.5) * 0.004;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      size: PARTICLE_SIZE,
      color: 0x0088ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture(),
      alphaTest: 0.01,
      depthWrite: false,
    });

    particlesRef.current = new THREE.Points(geometry, material);
    sceneRef.current.add(particlesRef.current);

    cameraRef.current.position.z = 5;

    // Animation - use requestAnimationFrame with cleanup
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!particlesRef.current) return;

      const positions = particlesRef.current.geometry.attributes.position.array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Boundary check and reset
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i + j]) > 5) {
            positions[i + j] *= -0.9;
          }
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.x += 0.0003;
      particlesRef.current.rotation.y += 0.0005;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Enhanced cleanup to avoid memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      if (containerRef.current && rendererRef.current && rendererRef.current.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (particlesRef.current && particlesRef.current.geometry) {
        particlesRef.current.geometry.dispose();
      }

      if (material) {
        material.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
