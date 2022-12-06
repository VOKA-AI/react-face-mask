import { useTexture, useGLTF } from "@react-three/drei"

export default function DebuggerModel(props) {
  if(props.modelName) {
    const model = useGLTF(props.modelName);
    console.log(model);
  }
  if(props.textureName) {
    const texture = useTexture(props.textureName);
    console.log(texture);
  }

  return (
    <group/ >
    )
  }
