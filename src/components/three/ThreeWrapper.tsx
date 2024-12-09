import { Canvas } from "@react-three/fiber"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSzeneState } from "../../state/szeneState"
import { CameraDolly } from "./CameraDolly"
import { Ducko } from "./Ducko"
import "./ThreeWrapper.css"
import { Environment } from "@react-three/drei"

export const ThreeWrapper = () => {
  const { activeSzene, setActiveSzene } = useSzeneState()
  const { pathname } = useLocation()

  useEffect(() => {
    setActiveSzene(pathname)
  }, [pathname])

  return (
    <div className={`three-wrapper ${activeSzene.ducko.dim ? "dim" : ""}`}>
      <Canvas>
        <CameraDolly cameraConfig={activeSzene.camera} />
        <pointLight position={[3, 4, 3]} intensity={100} color={"white"} />
        <Environment preset="night" backgroundBlurriness={0.3} />
        <Ducko duckoConfig={activeSzene.ducko} />
      </Canvas>
    </div>
  )
}
