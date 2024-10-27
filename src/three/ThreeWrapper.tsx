import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"
import { duckoSzenes } from "./sceneConfig"

export const ThreeWrapper = () => {
  const [activeSzene, setActiveSzene] = useState(duckoSzenes[0])

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/") {
      setActiveSzene(duckoSzenes[0])
    }
    if (pathname === "/projects") {
      setActiveSzene(duckoSzenes[1])
    }

    if (pathname === "/duck") {
      setActiveSzene(duckoSzenes[3])
    }
    if (pathname === "/about") {
      setActiveSzene(duckoSzenes[2])
    }
  }, [pathname])

  return (
    <Canvas>
      <fog attach="fog" args={["white", 0, 25]} />
      {/* <Dof /> */}
      <CameraDolly config={activeSzene.camera} />
      <pointLight position={[3, 4, 3]} intensity={100} color={"white"} />
      <Ducko showShards={activeSzene.shardsVisible} />
    </Canvas>
  )
}
