import { config, useSpring } from "@react-spring/three";
import { CameraControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Ducko } from "./ducko";

export const ThreeWrapper = () => {
  const [clicked, setClicked] = useState(true);

  const springs = useSpring({
    position: clicked ? [0, 0, 15] : [0, -20, 20],
    fov: clicked ? 50 : 50,
    lookAt: clicked ? [0, 0, 0] : [0, 0, 0],
    config: config.gentle,
  });

  // const s = useSpring({
  //   scale: clicked ? 0.8 : 1,
  //   // Fun jelly-like animation
  //   config: config.wobbly,
  // });

  const handleClick = () => {
    console.log("clicked");
    setClicked(!clicked);
  };

  return (
    <>
      <div className="debug">
        <button onClick={handleClick}>click</button>
      </div>
      <Canvas>
        {/* <Dof /> */}
        <CameraControls />
        <ambientLight intensity={0.7} />
        <directionalLight color="white" position={[10, 0, 10]} />
        <Environment preset="warehouse" />
        <Ducko />
      </Canvas>
    </>
  );
};
