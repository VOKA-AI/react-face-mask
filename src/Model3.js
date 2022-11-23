import React, { useEffect } from "react"
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from "three";

let tt = 0;
export function modelUpdate(v) {
  console.log(v);
  tt = v;
}

export function playAnimationInTime(t) {
  // 在t时长内，把动画播放一遍
}

export default function Model(props) {
  const { scene, animations } = useGLTF(props.modelName);
  let mixer = new THREE.AnimationMixer( scene );
  for( var idx in animations) {
    mixer.clipAction( animations[idx] ).setLoop(THREE.LoopOnce);
    mixer.clipAction( animations[idx] ).play();
  }
  useFrame((state, delta) => {
    //console.log(delta);
    //mixer.update(delta);
    //mixer.setTime(0.00122);
    //tt += 0.003i;
    //mixer.setTime(tt);
  });

  return (
    <group dispose={null} rotation={[0, 0, 0]} scale={15} >
      <primitive object={scene} />
    </group>
  )
}

