import { Canvas } from "@react-three/fiber"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSzeneState } from "../../state/szene-state"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"
import "./ThreeWrapper.css"

export const ThreeWrapper = () => {
  const { activeSzene, setActiveSzene } = useSzeneState()
  const { pathname } = useLocation()

  useEffect(() => {
    setActiveSzene(pathname)
  }, [pathname])

  return (
    <div className="three-wrapper">
      <Canvas>
        <fog attach="fog" args={["white", 0, 25]} />
        <CameraDolly cameraConfig={activeSzene.camera} />
        <pointLight position={[3, 4, 3]} intensity={100} color={"white"} />
        <Ducko duckoConfig={activeSzene.ducko} />
      </Canvas>
    </div>
  )
}
