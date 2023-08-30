import useWindowDimensions from "@/hooks/useWindowDimensions";
import { formatUnit } from "@/utils/index";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const gaisyrFont = "./ABCGaisyr-Book-Trial.ttf";
const mediumAutautGroteskFont = "./AutautGrotesk-Medium.otf";

export default function HomeQuote() {
  const state = useThree();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { width: canvasWidth, height: canvasHeight } =
    state.viewport.getCurrentViewport(state.camera, [0, 0, 1]);

  const formatUnitX = formatUnit(windowWidth, canvasWidth);
  const formatUnitY = formatUnit(windowHeight, canvasHeight);
  const screenSm = formatUnitX(640);
  const screenMd = formatUnitX(768);
  const screenLg = formatUnitX(1024);

  return (
    // 3
    <>
      {/* <Image
        position={[0, -canvasHeight * 2, 5]}
        scale={[canvasWidth, canvasHeight]}
        url="/white.svg"
      /> */}
      <group
        position={[0, -canvasHeight * 2 - canvasHeight / 8, 1]}
        scale={[1, 1, 1]}
      >
        {/* <Image
          position={[0, canvasHeight / 3.7, 0]}
          scale={[canvasWidth, canvasHeight / 2]}
          url="/white.svg"
        /> */}
        <mesh
          scale={[canvasWidth, canvasHeight / 1.5, 1]}
          position={[0, canvasHeight / 5.35, 0]}
        >
          <planeGeometry attach="geometry" />
          <meshBasicMaterial attach="material" color="#ffffff" />
        </mesh>
      </group>
      <group
        position={[-canvasWidth / 2, -canvasHeight - canvasHeight / 2, 1]}
        scale={[1, 1, 5]}
      >
        <Text
          color="#000000"
          font={gaisyrFont}
          anchorX="left"
          anchorY="top"
          position={[formatUnitX(20), -formatUnitY(125), 0]}
          scale={[0.5, 0.5, 1]}
          fontSize={canvasWidth >= screenSm ? 0.175 : 0.17}
          lineHeight={1}
        >
          {"FINDING YOUR EDGE"}
        </Text>
        <Text
          color="#000000"
          font={mediumAutautGroteskFont}
          anchorX="left"
          position={[formatUnitX(20), -formatUnitY(165), 0]}
          anchorY="top"
          scale={[0.5, 0.5, 1]}
          fontSize={canvasWidth >= screenMd ? 0.675 : 0.425}
          lineHeight={1}
          // letterSpacing={0}
        >
          {
            "Branding is an underrated\nmoat for businesses.\nWe can build that with you."
          }
        </Text>
      </group>
    </>
  );
}
