import { DoubleSide, Texture, Vector3 } from "three"

type Props = {
  texture: Texture
  height: number
  position?: Vector3
  asSprite?: boolean
}

export const ImageElement = ({
  texture,
  height,
  asSprite,
  position = new Vector3(0, 0, 0)
}: Props) => {
  const imageWidth = texture.image.width
  const imageHeight = texture.image.height
  const scaledWidth = (imageWidth / imageHeight) * height
  const scale = new Vector3(scaledWidth, height, 1)

  if (asSprite) {
    return <SpriteImage texture={texture} position={position} scale={scale} />
  }
  return <PlaneImage texture={texture} position={position} scale={scale} />
}

type ImageProps = {
  texture: Texture
  position: Vector3
  scale: Vector3
}

const PlaneImage = ({ texture, position, scale }: ImageProps) => (
  <mesh scale={scale} position={position}>
    <planeGeometry args={[1, 1]} />
    <meshStandardMaterial
      map={texture}
      side={DoubleSide}
      alphaToCoverage
      transparent
    />
  </mesh>
)

const SpriteImage = ({ texture, position, scale }: ImageProps) => (
  <sprite scale={scale} position={position}>
    <spriteMaterial
      map={texture}
      side={DoubleSide}
      alphaToCoverage
      opacity={0}
    />
  </sprite>
)
