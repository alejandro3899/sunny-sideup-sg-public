import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls, useTexture, useGLTF  } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = () => {
  // location of the 3D model
  const { nodes } = useGLTF("/SmileFriedEgg.gltf");
  const texture = useTexture('./textures/SmileFriedEgg_BaseColor.png');
  texture.flipY = false;
  return (
    <>
      {/* Use scale to control the size of the 3D model */}
      <mesh geometry={ nodes.SmileFriedEgg.geometry } scale={0.01} >
          <meshBasicMaterial map={ texture } />
      </mesh>
    </>
  );
};

export default function ModelViewer() {
  return (
        <div className="globe" style={{backgroundColor: 'black'}}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                <Suspense fallback={null}>
                    <Model />
                    {/* To add environment effect to the model */}
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls autoRotate />
            </Canvas>
        </div>
  )
}
