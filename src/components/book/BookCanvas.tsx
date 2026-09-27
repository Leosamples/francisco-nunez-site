"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// 6×9 trim, ~140 pages.
const W = 2;
const H = 3;
const D = 0.26;

const BASE_ROT_Y = -0.42;
const BASE_ROT_X = 0.06;

function usePageEdgeTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 16;
    c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#e9e4d8";
    g.fillRect(0, 0, c.width, c.height);
    for (let y = 0; y < c.height; y += 2) {
      // deterministic grain so renders are pure
      g.fillStyle = `rgba(120,110,95,${0.08 + (((y * 7919) % 13) / 13) * 0.12})`;
      g.fillRect(0, y, c.width, 1);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

type Input = { current: { x: number; y: number } };

function Book({ coverSrc, input, onReady }: { coverSrc: string; input: Input; onReady: () => void }) {
  const mesh = useRef<THREE.Mesh>(null);
  const cover = useLoader(THREE.TextureLoader, coverSrc);
  const pages = usePageEdgeTexture();

  const materials = useMemo(() => {
    // Configure a clone rather than mutating the loader's cached texture.
    const coverMap = cover.clone();
    coverMap.colorSpace = THREE.SRGBColorSpace;
    coverMap.anisotropy = 4;
    const board = new THREE.MeshStandardMaterial({ color: "#0b1020", roughness: 0.55, metalness: 0.1 });
    const paper = new THREE.MeshStandardMaterial({ map: pages, roughness: 0.9 });
    const front = new THREE.MeshStandardMaterial({ map: coverMap, roughness: 0.42, metalness: 0.05 });
    // BoxGeometry face order: +x, -x, +y, -y, +z (front), -z (back)
    return [paper, board, paper, paper, front, board];
  }, [cover, pages]);

  useEffect(onReady, [onReady]);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const { x, y } = input.current;
    m.rotation.y = THREE.MathUtils.damp(m.rotation.y, BASE_ROT_Y + x * 0.32 + Math.sin(t * 0.5) * 0.05, 3, delta);
    m.rotation.x = THREE.MathUtils.damp(m.rotation.x, BASE_ROT_X - y * 0.2, 3, delta);
    m.rotation.z = Math.sin(t * 0.7) * 0.018;
    m.position.y = Math.sin(t * 0.9) * 0.09;
  });

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[W, H, D]} />
    </mesh>
  );
}

export default function BookCanvas({
  coverSrc,
  active,
  onReady,
}: {
  coverSrc: string;
  /** false pauses the render loop (off-screen). */
  active: boolean;
  onReady: () => void;
}) {
  const input = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Desktop: pointer tilts the book. Touch devices: scroll position does.
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      const onMove = (e: PointerEvent) => {
        input.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        input.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }
    const onScroll = () => {
      const p = Math.min(window.scrollY / window.innerHeight, 1);
      input.current.x = p * 1.6 - 0.2;
      input.current.y = -p * 0.6;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6.4], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[-3, 4, 5]} intensity={2.2} />
      {/* cyan rim, echoing the beam */}
      <pointLight position={[3.2, -1.5, 1.5]} intensity={14} color="#4fc8f0" />
      <pointLight position={[-3, 1, -2]} intensity={6} color="#1e3a8c" />
      <Suspense fallback={null}>
        <Book coverSrc={coverSrc} input={input} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
