import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { Group, TextureLoader } from "three"

import { duckSpritesAngry } from "../../config/szeneConfig"
import { ImageElement } from "./ImageElement"
import { Shards } from "./Shards"
import { TagName } from "./TagName"
import { useAudioGain } from "./useAudioGainHook"
import {
  animateAmpImpact,
  animateShardsHidden,
  animateShardsVisible,
  animateSzeneVisible,
  turnSzeneAway
} from "./utils"

type Props = {
  showShards: boolean
  text: string
}

export const DuckoWrapper = ({ showShards, text }: Props) => {
  const shardRef = useRef<Group>(null!)
  const duckRef = useRef<Group>(null!)
  const szeneRef = useRef<Group>(null!)
  const audioImpactRef = useAudioGain()

  // hier automatismus einbauen, der andere duckos erlaubt
  const { ducko, shards } = useMemo(() => duckSpritesAngry, [showShards])
  const duckTexture = useMemo(() => useLoader(TextureLoader, ducko), [])

  const [visibleText, setVisibleText] = useState("")
  useEffect(() => {
    if (showShards) {
      setVisibleText(text)
      turnSzeneAway(szeneRef.current)
    }
  }, [text])

  useFrame((_, delta) => {
    animateSzeneVisible(szeneRef.current, duckRef.current)
    animateAmpImpact(duckRef.current, audioImpactRef * -0.05)

    if (showShards) {
      animateAmpImpact(shardRef.current, audioImpactRef * 0.15)
      animateShardsVisible(shardRef.current, delta)
    } else {
      animateShardsHidden(shardRef.current)
    }
  })

  return (
    <group ref={szeneRef}>
      <Float speed={0.2}>
        <TagName text={visibleText} />
        <group ref={duckRef}>
          <ImageElement texture={duckTexture} height={5.5} />
        </group>
      </Float>
      <Float rotationIntensity={0.3}>
        <group ref={shardRef}>
          <Shards images={shards} visible={showShards} />
        </group>
      </Float>
    </group>
  )
}
