import React from "react"
import { useEffect, useRef } from 'react'
import { useGLTF, useTexture } from "@react-three/drei"
import { useFrame } from '@react-three/fiber';

var _model = null;
var _mesh = null; // mesh with morph targets

let blandshape = {
 "eye-L":0,
 "eye-R":0,
 "eyes-_down":0,
 "mouse":0,
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
function setMeshMorphTargetInfluences(blandshape) {
  for(var key in blandshape) {
    _mesh.morphTargetInfluences[_mesh.morphTargetDictionary[key]] = blandshape[key];
  }
}

export function modelUpdateModelPosition(position) {
    var x = (position['x'] - 160) / 50;
    var y = -(position['y'] - 50) / 50;
    var z = (position['z'] + 10) / 60;
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
  var mesh = model.scene.children[ 0 ];
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
  const model = useGLTF(props.modelName);
  const scene = getSceneFromModel(model);
  var mesh = getMorphTargetMesh(model);
  const objRef = useRef();
  useEffect(() => {
    _model = objRef.current;
  });

  useFrame((state, delta) => {
    setMeshMorphTargetInfluences(blandshape,""); // 每一帧，都修改blandshapes的值，做出相应表情
  });

  return (
    <group dispose={null} rotation={[0, 0, 0]} scale={props.scale} ref={objRef}>
    <ambientLight intensity={0.1} />
    <directionalLight position={[0, 5, 5]} />
    <primitive object={scene} />
    </group>
    )
  }

