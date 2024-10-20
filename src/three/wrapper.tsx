import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { CameraDolly } from "./CameraDolly";
import { Ducko } from "./ducko";

export const ThreeWrapper = () => {
  const [duckoState, setDuckoState] = useState(0);

  const handleClick = () => {
    console.log("duckostate: ", duckoState ? 0 : 1);
    setDuckoState((state) => (state ? 0 : 1));
  };

  return (
    <>
      <div className="debug">
        <button onClick={handleClick}>click</button>
      </div>
      <Canvas>
        {/* <Dof /> */}

        {/* <CameraControls /> */}

        <CameraDolly positionIndex={duckoState} />
        <ambientLight intensity={0.7} />
        <directionalLight color="white" position={[10, 0, 10]} />
        <Environment preset="warehouse" />
        <Ducko />
      </Canvas>
    </>
  );
};
