import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"

export const ThreeWrapper = () => {
  const [duckoState, setDuckoState] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/projects") {
      setDuckoState(1)
    }

    if (pathname === "/") {
      setDuckoState(0)
    }
  }, [pathname])

  return (
    <Canvas>
      {/* <Dof /> */}

      <CameraDolly positionIndex={duckoState} />
      {/* <ambientLight intensity={0.7} /> */}
      {/* <directionalLight color="white" position={[0, 10, 10]} /> */}
      {/* <Environment preset="warehouse" /> */}
      <Ducko rotate={duckoState === 1} />
    </Canvas>
  )
}
