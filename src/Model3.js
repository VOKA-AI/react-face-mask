import React, { useEffect } from "react"
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"



let _actions;
let _names;

export function start_play() {
  _actions[_names[2]].reset().play()
}

export function stop_play() {
  _actions[_names[2]].reset().stop()
}

export default function Model(props) {
  // Fetch model and a separate texture
  const { nodes, animations } = useGLTF("/FaceCap.glb")
  console.log(nodes);
  console.log(animations);
  const texture = useTexture("/stacy.jpg")
  // Extract animation actions
  const { ref, actions, names } = useAnimations(animations)
  console.log(ref);
  console.log(actions);
  console.log(names);
  _actions = actions;
  _names = names;
   useEffect(() => {
     actions[names[0]].reset().play()
   })
  return (
    <group ref={ref} dispose={null} rotation={[Math.PI / 2, 0, 0]} scale={10}>
      
        <primitive object={nodes.head} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.head.geometry}
          skeleton={nodes.head.skeleton}>
          <meshStandardMaterial map={texture} map-flipY={false} skinning />
        </skinnedMesh>
    </group>
  )
}

