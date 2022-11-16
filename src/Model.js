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
  const { nodes, animations } = useGLTF("/stacy.glb")
  const texture = useTexture("/stacy.jpg")
  // Extract animation actions
  const { ref, actions, names } = useAnimations(animations)
  _actions = actions;
  _names = names;
//   useEffect(() => {
//     actions[names[2]].reset().play()
//   })
  return (
    <group ref={ref} dispose={null} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
      
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.stacy.geometry}
          skeleton={nodes.stacy.skeleton}>
          <meshStandardMaterial map={texture} map-flipY={false} skinning />
        </skinnedMesh>
    </group>
  )
}

