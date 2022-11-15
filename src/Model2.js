export default function Model2(props) {
  return (
    <object3D>
      <mesh name="mainCube">
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>
    </object3D>
  );
}
