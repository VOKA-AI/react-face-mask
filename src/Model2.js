import React from "react"
import { useEffect, useRef } from 'react'
import { useGLTF, useTexture } from "@react-three/drei"
import { useFrame } from '@react-three/fiber';

var _model = null;
var _mesh = null; // mesh with morph targets
var times = 10000

let blandshape = {
 "Mfers_eyeL":0,
 "Mfers_eyeR":0,
 "Mfers_eyedown":0,
 "Mfers_mouse":0,
}

let blandshape2 = {
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
    console.log(position['z']);
    var x = (position['x'] - 160) / 20;
    var y = -(position['y'] - 20) / 40;
    var z = (position['z'] - 40) / 5;
    console.log(z);
    x = Math.round(x * times) / times;
    y = Math.round(y * times) / times;
    z = Math.round(z * times) / times;
    _model.position.set(x, y, z);
}

export function modelUpdateModelRotation(rotation) {
  // set rotation and apply it to position
  var rx = -(rotation['x'] - 10) / 50;
  var ry = -rotation['y'] / 50;
  var rz = rotation['z'] / 50;
  rx = Math.round(rx * times) / times;
  ry = Math.round(ry * times) / times;
  rz = Math.round(rz * times) / times;
  _model.rotation.x = rx;
  _model.rotation.y = ry;
  _model.rotation.z = rz;
}


/*
 * 获取包含morphTarget的mesh，不通的model可能不同
 */
function getMorphTargetMesh(model) {
  var mesh = model.scene.children[ 0 ].children[ 2 ];
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

