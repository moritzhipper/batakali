import { PerspectiveCamera } from "@react-three/drei";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

export const Dof = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        far={100}
        near={0.1}
        fov={50}
      />
      <EffectComposer>
        <DepthOfField
          target={[0, 0, 0]}
          focusDistance={10}
          focalLength={0.19}
          bokehScale={4}
        />
      </EffectComposer>
    </>
  );
};
