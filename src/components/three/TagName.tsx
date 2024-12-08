import { Center, Text3D } from "@react-three/drei"
import { useEffect } from "react"
import font from "./tbc_font.json"

type Props = {
  text: string
}

export const TagName = ({ text }: Props) => {
  useEffect(() => {
    console.log(text)
  }, [text])

  return (
    <group scale={0.2} position={[0, 0, 0.8]} userData={{ isTag: true }}>
      <Center cacheKey={text}>
        <Text3D font={font}>
          {text}
          <meshStandardMaterial
            color={"white"}
            transparent={true}
            opacity={0}
          />
        </Text3D>
      </Center>
    </group>
  )
}

type AnimTagWrapperProps = {
  opacity: number
  scale: number
}

const AnimTagWrapper = ({ opacity, scale }: AnimTagWrapperProps) => {
  return (
    <group scale={0.2} position={[0, 0, 0.8]} userData={{ isTag: true }}>
      <Center cacheKey={text}>
        <Text3D font={font}>
          {text}
          <meshStandardMaterial
            color={"white"}
            transparent={true}
            opacity={0}
          />
        </Text3D>
      </Center>
    </group>
  )
}
