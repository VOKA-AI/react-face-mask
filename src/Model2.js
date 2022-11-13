import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function Model2(props) {
  const { nodes, materials } = useGLTF("https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf");
  console.log(nodes);
  console.log(materials);
  return (
   <group {...props} dispose={null} scale={1}>
     <mesh
       castShadow
       receiveShadow
       geometry = {nodes.Suzanne.geometry}
       material = {materials["default"]}
          scale={100}
     />
   </group>
  );
}
useGLTF.preload("https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf");
