import { a, useSpringValue } from "@react-spring/three"
import { PerspectiveCamera } from "@react-three/drei"
import { PerspectiveCameraProps, useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import { CameraConfig, duckoSzenes } from "./sceneConfig"

type Props = {
  config: CameraConfig
}

export const CameraDolly = ({ config }: Props) => {
  const AnimatedCamera = useMemo(() => a(CameraWrapper), [])

  const positionSpring = useSpringValue(
    duckoSzenes[0].camera.position,
    config.stiff
  )
  const lookAtSpring = useSpringValue(duckoSzenes[0].camera.lookAt)

  useEffect(() => {
    lookAtSpring.start(config.lookAt)
    positionSpring.start(config.position)
  }, [config])

  return (
    <>
      <PerspectiveCamera makeDefault far={100} near={0.01} />
      <AnimatedCamera position={positionSpring} lookAt={lookAtSpring} />
    </>
  )
}

const CameraWrapper = ({ position, lookAt }: PerspectiveCameraProps) => {
  const { camera } = useThree()
  camera.position.set(...position)
  camera.lookAt(...lookAt)

  return null
}
