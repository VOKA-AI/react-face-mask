import React from "react"
import { useEffect, useRef } from 'react'
import { useGLTF } from "@react-three/drei"
import { useFrame } from '@react-three/fiber';

var _model = null;
var _mesh = null; // mesh with morph targets

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

export function modelUpdateModelPosition(position) {
    var x = (position['x'] - 160) / 30;
    var y = -(position['y'] - 115) / 30;
    var z = (position['z'] - 20) / 30;
    _model.position.set(x, y, z);
}

export function modelUpdateModelRotation(rotation) {
  // set rotation and apply it to position
  _model.rotation.x = -(rotation['x'] - 10) / 50;
  _model.rotation.y = -rotation['y'] / 50;
  _model.rotation.z = rotation['z'] / 50;
}


/*
 * 获取包含morphTarget的mesh，不通的model可能不同
 */
function getMorphTargetMesh(model) {
  var mesh = model.scenes[0].children[ 0 ].children[ 0 ].children[ 2 ];
  //var mesh = model.scene.children[ 0 ].children[ 1 ];
  _mesh = mesh;
  return mesh;
}

/*
 * 获取主要scene，用于primitive
 */
function getSceneFromModel(model) {
  var scene = model.scene;
  return scene;
}

export default function Model(props) {
  const model  = useGLTF(props.modelName);
  const scene = getSceneFromModel(model);
  //const { scene, scenes } = useGLTF(props.modelName);
  // 获取包含morphTarget的mesh，不通的model可能不通
  var mesh = getMorphTargetMesh(model);
  const objRef = useRef();
  useEffect(() => {
    _model = objRef.current;
  });

  useFrame((state, delta) => {
    setMeshMorphTargetInfluences(mesh, blandshape,"shapes."); // 每一帧，都修改blandshapes的值，做出相应表情
  });

  return (
    <group dispose={null} rotation={[0, 0, 0]} scale={props.scale} ref={objRef}>
    <primitive object={scene} />
    </group>
    )
  }

