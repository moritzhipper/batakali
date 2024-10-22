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
      <fog attach="fog" args={["white", 0, 25]} />
      {/* <Dof /> */}
      <CameraDolly positionIndex={duckoState} />
      <pointLight position={[3, 4, 3]} intensity={40} color={"white"} />
      <Ducko rotate={duckoState === 1} />
    </Canvas>
  )
}
