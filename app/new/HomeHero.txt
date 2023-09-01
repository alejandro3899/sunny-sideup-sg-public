"use client";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { formatUnit } from "@/utils";
import { Image, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const semiBoldFont = "./AutautGrotesk-Semibold.otf";
const mediumMonumentGroteskFont = "./MonumentGrotesk-Medium.ttf";
const mediumAutautGroteskFont = "./AutautGrotesk-Medium.otf";

export default function HomeHero() {
  const state = useThree();
  const { width: canvasWidth, height: canvasHeight } =
    state.viewport.getCurrentViewport(state.camera, [0, 0, 1]);
  const { width, height } = useWindowDimensions();

  const formatUnitX = formatUnit(width, canvasWidth);
  const formatUnitY = formatUnit(height, canvasHeight);
  const screenSm = formatUnitX(640);
  const screenMd = formatUnitX(768);
  const screenLg = formatUnitX(1024);
  const timePosY = -canvasHeight / 2 + formatUnitY(24);
  const bookingsPosY =
    canvasWidth >= screenSm
      ? canvasWidth >= screenLg
        ? -canvasHeight / 4
        : -canvasHeight / 2 + formatUnitY(24)
      : -canvasHeight / 2 - formatUnitY(72);
  const bookingsPosX =
    canvasWidth >= screenSm
      ? canvasWidth >= screenLg
        ? formatUnitX(150)
        : formatUnitX(-75)
      : -canvasWidth / 2 + formatUnitX(20);

  return (
    <>
      <Image
        position={[0, 0, 1]}
        scale={canvasWidth >= screenSm ? [6, 6.007] : [4, 4.007]}
        url="/visax.png"
      />
      {/* hero text */}
      <Text
        anchorX="left"
        anchorY="bottom"
        position={[-canvasWidth / 2 + formatUnitX(20), -canvasHeight / 3, 1]}
        scale={[0.5, 0.5, 1]}
        color="#ffffff"
        font={semiBoldFont}
        fontSize={canvasWidth >= screenSm ? 0.875 : 0.5}
        lineHeight={1}
      >
        {
          "300m startups\nare created every year.\nWe help your brand\nstand out."
        }
      </Text>

      {/* time */}
      {/* 1 */}
      <Text
        anchorX="left"
        anchorY="bottom"
        position={[-canvasWidth / 2 + formatUnitX(20), timePosY, 1]}
        scale={[0.5, 0.5, 1]}
        font={mediumMonumentGroteskFont}
        fontSize={0.16}
        lineHeight={1}
        color="#ffffff"
      >
        {"SIN\n\nLAX\n\nMETA"}
      </Text>
      {/* 2 */}
      <Text
        anchorX="left"
        anchorY="bottom"
        position={[-canvasWidth / 2 + formatUnitX(75), timePosY, 1]}
        scale={[0.5, 0.5, 1]}
        font={mediumMonumentGroteskFont}
        fontSize={0.16}
        lineHeight={1}
        color="#ffffff"
      >
        {"01:28:23\n\n9:27:23\n\n11:28:23"}
      </Text>
      {/* 3 */}
      <Text
        anchorX="left"
        anchorY="bottom"
        position={[-canvasWidth / 2 + formatUnitX(155), timePosY, 1]}
        scale={[0.5, 0.5, 1]}
        font={mediumMonumentGroteskFont}
        fontSize={0.16}
        lineHeight={1}
        color="#ffffff"
      >
        {`GMT +8\n\nPST\n\nUTC -6`}
      </Text>

      {/* others */}
      <Text
        anchorX="left"
        anchorY="bottom"
        position={[bookingsPosX, bookingsPosY, 1]}
        scale={[0.5, 0.5, 1]}
        font={mediumAutautGroteskFont}
        fontSize={0.35}
        lineHeight={1.2}
        color="#ffffff"
      >
        {"Sunny Side Up is a brand\nagency based in Singapore"}
      </Text>
    </>
  );
}
