import { a, easings, useSpring, useSpringValue } from "@react-spring/three"
import { Center, Text3D } from "@react-three/drei"
import { useEffect, useMemo } from "react"
import { useMediaQuery } from "../../useMediaHook"
import font from "./tbc_font.json"

type Props = {
  text: string
}

export const TagName = ({ text }: Props) => {
  const isMobile = useMediaQuery("(max-width: 700px)")
  const animationTimeOut = 1000
  const animationTime = isMobile ? 6000 : 6000

  const lettersMoreThanThree = Math.max(0, text.length - 3)

  const scaleFactorMobile = 1 - 0.02 * lettersMoreThanThree
  const scaleFactor = isMobile ? scaleFactorMobile : 1

  const scrollWidthMobile = lettersMoreThanThree * 0.25
  const scrollWidth = isMobile ? scrollWidthMobile : 0.4

  console.log(scrollWidth)

  const configIn = { config: { tension: 20, friction: 10 } }
  const configOut = {
    config: { duration: animationTimeOut, easings: easings.easeOutQuart }
  }
  const configVerySlow = {
    config: { duration: animationTime }
  }

  const scrollValues = {
    from: {
      x: scrollWidth
    },
    to: {
      x: scrollWidth * -1
    }
  }

  const opacity = useSpringValue(0)
  const scale = useSpringValue(0.3)
  const [props, api] = useSpring(configVerySlow, [scrollValues])

  api.stop()
  const AnimatedText = useMemo(() => a(AnimTagWrapper), [text])

  useEffect(() => {
    opacity.reset()
    scale.reset()
    api.start(scrollValues)
    opacity.start(1, configOut)
    scale.start(scaleFactor, configIn)

    const timeOut = setTimeout(() => {
      opacity.start(0, configOut)
      // x.start(scrollWidth * -1.5, springConfig)
    }, animationTime - animationTimeOut)

    return () => {
      clearTimeout(timeOut)
    }
  }, [text])

  return (
    <AnimatedText opacity={opacity} scale={scale} text={text} x={props.x} />
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
    <group scale={scale} position={[x, 0, 0.8]} userData={{ isTag: true }}>
      <Center cacheKey={text}>
        <Text3D font={font} scale={0.8}>
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
