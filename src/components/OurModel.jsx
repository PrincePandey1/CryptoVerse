import React from 'react'
//It's used to render 3D Model
import { Canvas } from "@react-three/fiber"
import { useGLTF, PresentationControls, Stage } from "@react-three/drei"

//This function is used to Load our Model by the given path
function Model(props){
    const {scene} = useGLTF('./bitcoin.glb')
    return <primitive object={scene} {...props} /> 
}

const OurModel = () => {
  return (
    <div>
           <Canvas dpr={[1,2]} shadows camera={{fov: 45}} style={{position:"absolute", top:"7%"}}  >
        
        <color attach="background" args={['#101010']} /> 
        <ambientLight intensity={-1}  />
  
        <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]} >
          <Stage environment={null} >
          <Model scale={0.01} /> 
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  )
}

export default OurModel