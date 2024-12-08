import { a, useSpringValue } from "@react-spring/three"
import { Center, Text3D } from "@react-three/drei"
import { useEffect, useMemo } from "react"
import { springConfig } from "../../config/szeneConfig"
import font from "./tbc_font.json"

type Props = {
  text: string
}

export const TagName = ({ text }: Props) => {
  const opacity = useSpringValue(0, springConfig)
  const scale = useSpringValue(0.2, springConfig)
  const AnimatedText = useMemo(() => a(AnimTagWrapper), [text])

  useEffect(() => {
    opacity.reset()
    scale.reset()

    opacity.start(1)
    scale.start(0.5)

    const timeOut = setTimeout(() => {
      opacity.start(0)
      scale.start(0.2)
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [text])

  return <AnimatedText opacity={opacity} scale={scale} text={text} />
}

type AnimTagWrapperProps = {
  opacity: number
  scale: number
  text: string
}

const AnimTagWrapper = ({ opacity, scale, text }: AnimTagWrapperProps) => {
  return (
    <group scale={scale} position={[0, 0, 0.8]} userData={{ isTag: true }}>
      <Center cacheKey={text}>
        <Text3D font={font}>
          {text}
          <meshStandardMaterial
            color={"white"}
            transparent={true}
            opacity={opacity}
          />
        </Text3D>
      </Center>
    </group>
  )
}
