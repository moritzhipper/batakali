import { Float } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { Group, TextureLoader } from "three"

import { duckSpritesAngry } from "../../config/szeneConfig"
import { useAudioStore } from "../../state/audioState"
import { DuckoConfig } from "../../types"
import { ImageElement } from "./Shard"
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
  duckoConfig: DuckoConfig
}

export const DuckoWrapper = ({ duckoConfig }: Props) => {
  const { shardsVisible } = duckoConfig
  const shardRef = useRef<Group>(null!)
  const duckRef = useRef<Group>(null!)
  const szeneRef = useRef<Group>(null!)
  const audioImpactRef = useAudioGain()

  const isInitialRender = useRef(true)

  // hier automatismus einbauen, der andere duckos erlaubt
  const { selectedProject } = useAudioStore()
  const { ducko, shards } = useMemo(() => duckSpritesAngry, [duckoConfig])

  const duckTexture = useMemo(() => useLoader(TextureLoader, ducko), [])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    turnSzeneAway(szeneRef.current)
  }, [selectedProject.tag])

  useFrame((_, delta) => {
    animateSzeneVisible(szeneRef.current, duckRef.current)
    animateAmpImpact(shardRef.current, audioImpactRef * 0.15)
    animateAmpImpact(duckRef.current, audioImpactRef * -0.05)

    if (shardsVisible) {
      animateShardsVisible(shardRef.current, delta)
    } else {
      animateShardsHidden(shardRef.current)
    }
  })

  return (
    <group ref={szeneRef}>
      <Float speed={0.2}>
        <TagName text={selectedProject.tag} />
        <group ref={duckRef}>
          <ImageElement texture={duckTexture} height={5.5} />
        </group>
      </Float>
      <Float rotationIntensity={0.3}>
        <group ref={shardRef}>
          <Shards images={shards} visible={shardsVisible} />
        </group>
      </Float>
    </group>
  )
}
