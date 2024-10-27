import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getConfigForRoute } from "./animation-utils"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"

export const ThreeWrapper = () => {
  const [activeSzene, setActiveSzene] = useState(getConfigForRoute())

  const { pathname } = useLocation()

  useEffect(() => {
    setActiveSzene(getConfigForRoute(pathname))
  }, [pathname])

  return (
    <Canvas>
      <fog attach="fog" args={["white", 0, 25]} />
      {/* <Dof /> */}
      <CameraDolly cameraConfig={activeSzene.camera} />
      <pointLight position={[3, 4, 3]} intensity={100} color={"white"} />
      <Ducko duckoConfig={activeSzene.ducko} />
    </Canvas>
  )
}
