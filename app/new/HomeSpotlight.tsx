"use client";

import { Image } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function HomeSpotlight() {
  const state = useThree();
  const { width: canvasWidth, height: canvasHeight } =
    state.viewport.getCurrentViewport(state.camera, [0, 0, 1]);

  return (
    <group
      position={[0, -canvasHeight - canvasHeight / 8, 1]}
      scale={[1, 1, 1]}
    >
      <Image
        position={[0, 0, 0]}
        scale={[canvasWidth, canvasHeight]}
        url="/demo.jpg"
      />
    </group>
  );
}
