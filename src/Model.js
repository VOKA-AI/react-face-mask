import React, { useEffect } from "react"
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"

export default function Model(props) {
  // Fetch model and a separate texture
  const { nodes, animations } = useGLTF("/stacy.glb")
  const texture = useTexture("/stacy.jpg")
  // Extract animation actions
  const { ref, actions, names } = useAnimations(animations)
  useEffect(() => {
    actions[names[2]].reset().play()
  })
  return (
    <group ref={ref} dispose={null} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
      
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.stacy.geometry}
          skeleton={nodes.stacy.skeleton}
          scale={100}>
          <meshStandardMaterial map={texture} map-flipY={false} skinning />
        </skinnedMesh>
    </group>
  )
}

