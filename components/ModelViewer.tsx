import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls, useTexture, useGLTF  } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = () => {
  // location of the 3D model
  const { nodes } = useGLTF("/SmileFriedEgg.gltf");
  const texture = useTexture('./textures/SmileFriedEgg_BaseColor.png');
  texture.flipY = false;
  return (
    <>
      {/* Use scale to control the size of the 3D model */}
      <mesh geometry={ nodes.SmileFriedEgg.geometry } scale={0.05} >
          <meshBasicMaterial map={ texture } />
      </mesh>
    </>
  );
};

export default function ModelViewer() {
  return (
        <div className="globe">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }} style={{width: `450px`}}>
                <ambientLight intensity={1} />
                <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[55, 55]} />
    
                <directionalLight position={[0, 5, -4]} intensity={4} />
                <directionalLight position={[0, -15, -0]} intensity={4} color="white" />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
                 <Environment preset="city" />
                 <EffectComposer disableNormalPass>
                  <N8AO color="white" aoRadius={2} intensity={1} />
                </EffectComposer>
                <OrbitControls autoRotate autoRotateSpeed={0.6}/>
            </Canvas>
        </div>
  )
}
