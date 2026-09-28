"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Height is fixed; width follows the cover art's proportions. ~140 pages deep.
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

/**
 * What drives the tilt.
 * - "pointer" (mouse/trackpad): cursor position across the window.
 * - "scroll" (touch): the book's own progress through the viewport, read every
 *   frame (smooth through iOS momentum scrolling), plus device orientation
 *   where the browser allows it without a permission prompt (not iOS).
 */
type Tilt = {
  current: { mode: "pointer" | "scroll"; px: number; py: number; gamma: number; beta: number };
};

const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;

function Book({
  coverSrc,
  aspect,
  input,
  onReady,
}: {
  coverSrc: string;
  aspect: number;
  input: Tilt;
  onReady: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const cover = useLoader(THREE.TextureLoader, coverSrc);
  const pages = usePageEdgeTexture();

  const materials = useMemo(() => {
    // Configure a clone rather than mutating the loader's cached texture.
    const coverMap = cover.clone();
    coverMap.colorSpace = THREE.SRGBColorSpace;
    coverMap.anisotropy = 4;
    // matches the cover's black
    const board = new THREE.MeshStandardMaterial({ color: "#131313", roughness: 0.55, metalness: 0.1 });
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
    const tilt = input.current;
    let yaw: number;
    let pitch: number;
    if (tilt.mode === "pointer") {
      yaw = BASE_ROT_Y + tilt.px * 0.32;
      pitch = BASE_ROT_X - tilt.py * 0.2;
    } else {
      // 0 as the book enters at the bottom of the screen, 1 as it leaves the top
      const r = state.gl.domElement.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      yaw = lerp(-0.95, 0.35, p) + clamp(tilt.gamma / 45, -1, 1) * 0.3;
      pitch = lerp(0.25, -0.2, p) + clamp(tilt.beta / 45, -1, 1) * 0.15;
    }
    m.rotation.y = THREE.MathUtils.damp(m.rotation.y, yaw + Math.sin(t * 0.5) * 0.05, 4, delta);
    m.rotation.x = THREE.MathUtils.damp(m.rotation.x, pitch, 4, delta);
    m.rotation.z = Math.sin(t * 0.7) * 0.018;
    m.position.y = Math.sin(t * 0.9) * 0.09;
  });

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[H * aspect, H, D]} />
    </mesh>
  );
}

export default function BookCanvas({
  coverSrc,
  aspect,
  active,
  onReady,
}: {
  coverSrc: string;
  /** cover width / height */
  aspect: number;
  /** false pauses the render loop (off-screen). */
  active: boolean;
  onReady: () => void;
}) {
  const input = useRef<Tilt["current"]>({ mode: "scroll", px: 0, py: 0, gamma: 0, beta: 0 });

  useEffect(() => {
    // Mouse/trackpad: the cursor tilts the book.
    if (window.matchMedia("(pointer: fine)").matches) {
      input.current.mode = "pointer";
      const onMove = (e: PointerEvent) => {
        input.current.px = (e.clientX / window.innerWidth) * 2 - 1;
        input.current.py = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }
    // Touch: scroll drives the tilt (read per frame). Add phone tilt where the
    // browser exposes it without a permission prompt; iOS requires one, so
    // there it's scroll only.
    input.current.mode = "scroll";
    const DOE = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> })
      | undefined;
    if (!DOE || typeof DOE.requestPermission === "function") return;
    let base: { gamma: number; beta: number } | null = null;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      base ??= { gamma: e.gamma, beta: e.beta };
      input.current.gamma = e.gamma - base.gamma;
      input.current.beta = e.beta - base.beta;
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
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
      {/* warm rim, echoing the cover's light source and the laser */}
      <pointLight position={[3.2, -1.5, 1.5]} intensity={12} color="#f5a623" />
      <pointLight position={[-3, 1, -2]} intensity={6} color="#8b1010" />
      <Suspense fallback={null}>
        <Book coverSrc={coverSrc} aspect={aspect} input={input} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
