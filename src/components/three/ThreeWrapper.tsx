import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import bwTexture from "../../assets/bw_environment_texture.jpg"
import { useAudioStore } from "../../state/audioState"
import { useSzeneState } from "../../state/szeneState"
import { CameraDolly } from "./CameraDolly"
import { DuckoWrapper } from "./DuckoWrapper"
import "./ThreeWrapper.css"

export const ThreeWrapper = () => {
  const { activeSzene, setActiveSzene } = useSzeneState()
  const { pathname } = useLocation()
  const { selectedProject } = useAudioStore()

  useEffect(() => setActiveSzene(pathname), [pathname])

  return (
    <div className={`three-wrapper ${activeSzene.ducko.dim ? "dim" : ""}`}>
      <Canvas>
        <CameraDolly cameraConfig={activeSzene.camera} />
        <pointLight position={[3, 4, 3]} intensity={100} color={"white"} />
        <Environment files={bwTexture} />
        <DuckoWrapper
          showShards={activeSzene.ducko.showShards}
          text={selectedProject.tag}
        />
      </Canvas>
    </div>
  )
}
