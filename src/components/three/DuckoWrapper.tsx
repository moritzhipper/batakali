import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { Group, TextureLoader } from "three"

import { DuckoTagConfig } from "../../types"
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
  tagConfig: DuckoTagConfig
}

export const DuckoWrapper = ({ showShards, tagConfig }: Props) => {
  const shardRef = useRef<Group>(null!)
  const duckRef = useRef<Group>(null!)
  const szeneRef = useRef<Group>(null!)
  const audioImpactRef = useAudioGain()

  const { ducko, shards, tag } = tagConfig
  const duckTexture = useMemo(
    () => useLoader(TextureLoader, ducko),
    [tagConfig]
  )

  const [visibleText, setVisibleText] = useState("")

  useEffect(() => {
    if (showShards) {
      setVisibleText(tag!)
      turnSzeneAway(szeneRef.current)
    }
  }, [tag])

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
        <TagName text={visibleText} color={tagConfig.color} />
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
