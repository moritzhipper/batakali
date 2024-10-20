import { a, useSpring } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps, useThree } from "@react-three/fiber";
import { useMemo } from "react";

type Props = {
  positionIndex: number;
};

const cameraSettings = [
  {
    position: [0, 0, 10],
    lookAt: [0, 0, 0],
  },
  {
    position: [0, -4, 10],
    lookAt: [0, -2, 0],
  },
];

export const CameraDolly = ({ positionIndex }: Props) => {
  const AnimatedCamera = useMemo(() => a(CameraWrapper), []);

  const { position, lookAt } = useSpring({
    position: cameraSettings[positionIndex].position,
    lookAt: cameraSettings[positionIndex].lookAt,
    config: { tension: 300, friction: 26 },
  });

  return (
    <>
      <PerspectiveCamera makeDefault />
      <AnimatedCamera position={position} lookAt={lookAt} />
    </>
  );
};

const CameraWrapper = ({ position, lookAt }: PerspectiveCameraProps) => {
  const { camera } = useThree();
  camera.position.set(...position);
  camera.lookAt(...lookAt);

  return null;
};
