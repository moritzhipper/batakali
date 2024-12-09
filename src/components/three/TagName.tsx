import { a, useSpring, useSpringValue } from "@react-spring/three"
import { Center, Text3D } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { useMediaQuery } from "../../useMediaHook"
import font from "./tbc_font.json"

type Props = {
  text: string
}

export const TagName = ({ text }: Props) => {
  const timeOutRef = useRef<number>(null!)
  const AnimatedText = useMemo(() => a(AnimTagWrapper), [text])
  const isMobile = useMediaQuery("(max-width: 700px)")
  const animationTimeOut = 1000
  const animationTime = isMobile ? 7000 : 5000

  const lettersMoreThanThree = Math.max(0, text.length - 3)

  const scaleFactor = 1 - 0.02 * lettersMoreThanThree
  const scrollWidthMobile = 0.7 + lettersMoreThanThree * 0.3
  const scrollWidth = isMobile ? scrollWidthMobile : 0.4

  const configIn = { config: { tension: 20, friction: 10 } }
  const configOut = {
    config: { duration: animationTimeOut }
  }
  const configVerySlow = { config: { duration: animationTime } }

  const scrollValues = {
    from: {
      x: scrollWidth,
      scale: 0
    },
    to: {
      x: scrollWidth * -1,
      scale: scaleFactor
    }
  }

  const opacity = useSpringValue(0)
  const scale = useSpringValue(0.3)
  const [scrollProps, api] = useSpring({ ...scrollValues, ...configVerySlow }, [
    scrollValues
  ])

  // use useMemo instead of useEffect to avoid the useEffect being called on every render

  useMemo(() => {
    clearTimeout(timeOutRef.current)
    scale.reset()
    opacity.reset()

    api.start(scrollValues)
    opacity.start(1, configIn)
    scale.start(scaleFactor, configIn)

    timeOutRef.current = setTimeout(() => {
      opacity.start(0, configOut)
    }, animationTime - animationTimeOut)
  }, [text])

  return (
    <AnimatedText
      opacity={opacity}
      scale={scale}
      text={text}
      x={scrollProps.x}
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
    <group scale={scale} position={[x, -0.9, 1]}>
      <Center cacheKey={text}>
        <Text3D font={font}>
          <meshStandardMaterial
            color={"silver"}
            transparent={true}
            opacity={opacity}
            metalness={0.9}
            roughness={0}
          />
          {text}
        </Text3D>
      </Center>
    </group>
  )
}
