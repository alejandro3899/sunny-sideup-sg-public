import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, useTexture, useGLTF  } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
export type ModelViewerProps = {
  pitchSpeed: number
};
const Model = ({pitchSpeed}: ModelViewerProps) => {
  const modelRef = useRef()

  useFrame(() => {
    modelRef.current.rotation.y += pitchSpeed * 0.3
    modelRef.current.rotation.x += pitchSpeed * 0.01
    modelRef.current.rotation.z -= pitchSpeed * 0.05
  })
  // location of the 3D model
  const { nodes } = useGLTF("/SmileFriedEgg.gltf");
  const texture = useTexture('./textures/SmileFriedEgg_BaseColor.png');
  texture.flipY = false;
  texture.flipX = false;
  return (
    <>
      {/* Use scale to control the size of the 3D model */}
      <mesh geometry={ nodes.SmileFriedEgg.geometry } scale={0.045} ref={modelRef} >
          <meshBasicMaterial map={ texture } />
      </mesh>
    </>
  );
};

export default function ModelViewer({pitchSpeed}: ModelViewerProps) {
  return (
        <div className="globe">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }} style={{width: `450px`}}>
                <ambientLight intensity={1} />
                <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[55, 55]} />
    
                <directionalLight position={[0, 5, -4]} intensity={4} />
                <directionalLight position={[0, -15, -0]} intensity={4} color="white" />
                <Suspense fallback={null}>
                    <Model pitchSpeed={pitchSpeed}/>
                </Suspense>
                 <Environment preset="city" />
                 <EffectComposer disableNormalPass>
                  <N8AO color="white" aoRadius={2} intensity={1} />
                </EffectComposer>
                <OrbitControls enableZoom={false} rotateSpeed={0.1} autoRotate enableDamping={true} />
            </Canvas>
        </div>
  )
}
