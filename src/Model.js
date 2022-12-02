import React from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from '@react-three/fiber';

let blandshape = {
 "browDown_L":0,
 "browDown_R":0,
 "browInnerUp":0,
 "browOuterUp_L":0,
 "browOuterUp_R":0,
 "cheekPuff":0,
 "cheekSquint_L":0,
 "cheekSquint_R":0,
 "eyeBlink_L":0,
 "eyeBlink_R":0,
 "eyeLookDown_L":0,
 "eyeLookDown_R":0,
 "eyeLookIn_L":0,
 "eyeLookIn_R":0,
 "eyeLookOut_L":0,
 "eyeLookOut_R":0,
 "eyeLookUp_L":0,
 "eyeLookUp_R":0,
 "eyeSquint_L":0,
 "eyeSquint_R":0,
 "eyeWide_L":0,
 "eyeWide_R":0,
 "jawForward":0,
 "jawLeft":0,
 "jawOpen":0,
 "jawRight":0,
 "mouthClose":0,
 "mouthDimple_L":0,
 "mouthDimple_R":0,
 "mouthFrown_L":0,
 "mouthFrown_R":0,
 "mouthFunnel":0,
 "mouthLeft":0,
 "mouthLowerDown_L":0,
 "mouthLowerDown_R":0,
 "mouthPress_L":0,
 "mouthPress_R":0,
 "mouthPucker":0,
 "mouthRight":0,
 "mouthRollLower":0,
 "mouthRollUpper":0,
 "mouthShrugLower":0,
 "mouthShrugUpper":0,
 "mouthSmile_L":0,
 "mouthSmile_R":0,
 "mouthStretch_L":0,
 "mouthStretch_R":0,
 "mouthUpperUp_L":0,
 "mouthUpperUp_R":0,
 "noseSneer_L":0,
 "noseSneer_R":0,
 "tongueOut":0,
}

// 外部调用，更新model对应的blandshape
export function modelUpdateBlandshape(bs) {
  for(var key in bs) {
    blandshape[key] = bs[key];
  }
}

/*
 * 设置mesh的morphTarget值，进而做出表情
 * mesh指包含morphTarget的mesh，传入没有morphTartget的mesh，会出错
 * prefix指morphTargetDictionary中，blockshape名称的前缀
 */
function setMeshMorphTargetInfluences(mesh, blandshape, prefix = "") {
  for(var key in blandshape) {
    mesh.morphTargetInfluences[mesh.morphTargetDictionary[prefix + key]] = blandshape[key];
  }
}

export default function Model(props) {
  const { scene, scenes } = useGLTF(props.modelName);
  // 获取包含morphTarget的mesh，不通的model可能不通
  var mesh = scenes[0].children[ 0 ].children[ 0 ].children[ 2 ];

  useFrame((state, delta) => {
    setMeshMorphTargetInfluences(mesh, blandshape,"shapes."); // 每一帧，都修改blandshapes的值，做出相应表情
  });

  return (
    <group dispose={null} rotation={[0, 0, 0]} scale={15} >
    <primitive object={scene} />
    </group>
    )
  }

