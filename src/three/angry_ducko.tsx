import angryDucko from "@models/angry_ducko.glb";
import { useAspect, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { MeshStandardMaterial } from "three";

export const AngryDucko = () => {
  const { nodes, materials } = useGLTF(angryDucko);

  const ref = useRef();
  const useAspect2 = useAspect;

  const { size } = useThree();

  const getScale = (w: number, h: number) => {
    if (w < h) {
      return w * 1;
    } else {
      return h * 1;
    }
  };

  const material = new MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: "red",
  });

  useFrame((state, delta) => {
    ref.current.lookAt(state.pointer.x * 0.05, 0, 1);
    // console.log(scale.width);
  });

  return (
    <group ref={ref}>
      <mesh
        geometry={nodes.path26.geometry}
        material={material}
        rotation={[Math.PI / 2, 0, 0]}
        scale={20}
      />
    </group>
  );
};
