"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import moonVertexShader from "~/shaders/moon/vertex.glsl";
import moonFragmentShader from "~/shaders/moon/fragment.glsl";

export default function MoonVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const moonRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [phaseText, setPhaseText] = useState<string>("");

  // Calculate moon phase (0-1) based on current date
  const calculateMoonPhase = () => {
    // Moon cycle is approximately 29.53 days
    const LUNAR_CYCLE = 29.53;

    // New Moon epoch (known new moon date)
    // January 2, 2022 was a new moon
    const KNOWN_NEW_MOON = new Date("2022-01-02T18:33:00Z");

    const now = new Date();
    const timeSinceNewMoon = now.getTime() - KNOWN_NEW_MOON.getTime();
    const daysSinceNewMoon = timeSinceNewMoon / (1000 * 60 * 60 * 24);

    // Calculate current position in the lunar cycle (0-1)
    const phase = (daysSinceNewMoon % LUNAR_CYCLE) / LUNAR_CYCLE;

    // Determine moon phase name
    let phaseName = "";
    if (phase < 0.025 || phase > 0.975) {
      phaseName = "New Moon";
    } else if (phase < 0.25) {
      phaseName = "Waxing Crescent";
    } else if (phase < 0.275) {
      phaseName = "First Quarter";
    } else if (phase < 0.475) {
      phaseName = "Waxing Gibbous";
    } else if (phase < 0.525) {
      phaseName = "Full Moon";
    } else if (phase < 0.725) {
      phaseName = "Waning Gibbous";
    } else if (phase < 0.775) {
      phaseName = "Last Quarter";
    } else {
      phaseName = "Waning Crescent";
    }

    setPhaseText(phaseName);
    return phase;
  };

  // Initialize the scene
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Calculate current moon phase
      const phase = calculateMoonPhase();
      setCurrentPhase(phase);

      // Create scene with a transparent background
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera with fixed position
      const camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.z = 3.5;
      cameraRef.current = camera;

      // Create renderer with alpha channel for transparency
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add ambient light for base illumination
      const ambientLight = new THREE.AmbientLight(0x333333);
      scene.add(ambientLight);

      // Create moon texture
      const textureLoader = new THREE.TextureLoader();

      // Use fallback textures in case loading fails
      const fallbackTexture = new THREE.CanvasTexture(createMoonTexture());
      const fallbackNormal = new THREE.CanvasTexture(createNormalMap());

      // Load the moon texture
      textureLoader.load(
        "/images/moon-texture.jpg",
        (texture) => {
          // Create normal map
          textureLoader.load(
            "/images/moon-normal.jpg",
            (normalMap) => {
              // Create moon with shader material
              const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
              const moonMaterial = new THREE.ShaderMaterial({
                uniforms: {
                  moonTexture: { value: texture },
                  normalMap: { value: normalMap },
                  phase: { value: phase },
                },
                vertexShader: moonVertexShader,
                fragmentShader: moonFragmentShader,
              });

              materialRef.current = moonMaterial;
              const moon = new THREE.Mesh(moonGeometry, moonMaterial);
              scene.add(moon);
              moonRef.current = moon;
            },
            undefined,
            () => {
              // Fallback if normal map fails to load
              const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
              const moonMaterial = new THREE.ShaderMaterial({
                uniforms: {
                  moonTexture: { value: texture },
                  normalMap: { value: fallbackNormal },
                  phase: { value: phase },
                },
                vertexShader: moonVertexShader,
                fragmentShader: moonFragmentShader,
              });

              materialRef.current = moonMaterial;
              const moon = new THREE.Mesh(moonGeometry, moonMaterial);
              scene.add(moon);
              moonRef.current = moon;
            },
          );
        },
        undefined,
        () => {
          // Fallback if texture fails to load
          const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
          const moonMaterial = new THREE.ShaderMaterial({
            uniforms: {
              moonTexture: { value: fallbackTexture },
              normalMap: { value: fallbackNormal },
              phase: { value: phase },
            },
            vertexShader: moonVertexShader,
            fragmentShader: moonFragmentShader,
          });

          materialRef.current = moonMaterial;
          const moon = new THREE.Mesh(moonGeometry, moonMaterial);
          scene.add(moon);
          moonRef.current = moon;
        },
      );

      // Animation loop - render the scene
      const animate = () => {
        requestAnimationFrame(animate);

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current)
          return;

        cameraRef.current.aspect =
          containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight,
        );
      };

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      };
    } catch (error) {
      console.error("Scene initialization error:", error);
    }
  }, []);

  // Create a basic moon texture if the image file is not available
  function createMoonTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    if (context) {
      // Create a gray-colored moon texture
      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, "#CCCCCC");
      gradient.addColorStop(0.8, "#AAAAAA");
      gradient.addColorStop(1, "#999999");

      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);

      // Add some crater-like noise
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 4 + 1;
        const color = Math.random() > 0.5 ? "#BBBBBB" : "#888888";

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
      }
    }

    return canvas;
  }

  // Create a basic normal map if the image file is not available
  function createNormalMap() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    if (context) {
      // Default normal map is a flat surface (pointing out)
      context.fillStyle = "#8080FF"; // RGB(128,128,255) - default normal
      context.fillRect(0, 0, 512, 512);
    }

    return canvas;
  }

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="mb-4 h-full w-full" />
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">Current Moon Phase: {phaseText}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
