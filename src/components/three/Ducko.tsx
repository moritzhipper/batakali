import { useLoader } from "@react-three/fiber"
import { useMemo } from "react"
import { TextureLoader } from "three"
import { ImageElement } from "./Shard"

type Props = {
  image: string
}

export const Ducko = ({ image }: Props) => {
  const duckTexture = useMemo(() => useLoader(TextureLoader, image), [])
  return <ImageElement texture={duckTexture} height={5.5} />
}
