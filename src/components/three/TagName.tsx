import { a, easings, useSpring } from "@react-spring/three"
import { Center, Text3D } from "@react-three/drei"
import { useMemo } from "react"
import { useMediaQuery } from "../../useMediaHook"
import font from "./tbc_font.json"

type Props = {
  text: string
}

export const TagName = ({ text }: Props) => {
  const AnimatedText = useMemo(() => a(AnimTagWrapper), [text])
  const isMobile = useMediaQuery("(max-width: 700px)")

  const lettersMoreThanThree = Math.max(0, text.length - 3)

  const scaleFactor = 1 - 0.02 * lettersMoreThanThree
  const scrollWidthMobile = 0.7 + lettersMoreThanThree * 0.2
  const scrollWidth = isMobile ? scrollWidthMobile : 0.4

  const configIn = { duration: 1000, easing: easings.linear }
  const configFly = { duration: 4000, easing: easings.linear }

  const scrollValues = {
    from: {
      x: scrollWidth,
      scale: 0.2,
      opacity: 0
    },
    to: [
      {
        x: scrollWidth,
        scale: scaleFactor,
        opacity: 1,
        config: configIn
      },
      {
        x: scrollWidth * -1,
        scale: scaleFactor,
        opacity: 1,
        config: configFly
      },
      {
        x: scrollWidth * -1.5,
        opacity: 0,
        config: configIn
      }
    ]
  }

  const [scrollProps, api] = useSpring({ ...scrollValues }, [])

  // use useMemo instead of useEffect to avoid the useEffect being called on every render
  useMemo(() => {
    api.start(scrollValues)
  }, [text])

  return (
    <AnimatedText
      opacity={scrollProps.opacity}
      scale={scrollProps.scale}
      x={scrollProps.x}
      text={text}
    />
  )
}

type AnimTagWrapperProps = {
  opacity: number
  scale: number
  x: number
  text: string
}

const AnimTagWrapper = ({ opacity, scale, x, text }: AnimTagWrapperProps) => {
  return (
    <group scale={scale} position={[x, -1, 1]}>
      <Center cacheKey={text}>
        <Text3D font={font}>
          <meshStandardMaterial
            color={"#999"}
            transparent={true}
            opacity={opacity}
            metalness={0.9}
            roughness={0.2}
          />
          {text}
        </Text3D>
      </Center>
    </group>
  )
}
