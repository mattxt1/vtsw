import { Environment, Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Object({ accent }: { accent: string }) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
      <RoundedBox ref={ref} args={[2.1, 2.7, 0.72]} radius={0.32} smoothness={5}>
        <meshPhysicalMaterial
          color={accent}
          roughness={0.22}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.24}
        />
      </RoundedBox>
    </Float>
  );
}

export default function SceneCanvas({
  accent,
  active,
}: {
  accent: string;
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      frameloop={active ? "always" : "never"}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 5, 6]} intensity={2.5} />
      <Object accent={accent} />
      <Environment preset="studio" />
    </Canvas>
  );
}
