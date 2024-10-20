import { useLoader } from "@react-three/fiber";
import { Texture, TextureLoader } from "three";
import duck from "../assets/images/duck.png";
import feather from "../assets/images/feather.png";
import shard1 from "../assets/images/shard1.png";
import shard2 from "../assets/images/shard2.png";

export const Ducko = () => {
  const duckTexture = useLoader(TextureLoader, duck);
  const textureMaps = {
    feather: useLoader(TextureLoader, feather),
    shard1: useLoader(TextureLoader, shard1),
    shard2: useLoader(TextureLoader, shard2),
  };

  const mapToShards = (sprites: SpriteConfig, height: number) =>
    sprites.map((sprite, i) => (
      <Image
        x={sprite.x}
        y={sprite.y}
        texture={textureMaps[sprite.type]}
        height={height}
        key={i}
      />
    ));

  const bigSpriteElements = mapToShards(bigShards, 1.1);
  const mediumSpriteElements = mapToShards(mediumShards, 0.8);
  const smallSpriteElementsInner = mapToShards(smallShardsInner, 0.5);
  const smallSpriteElementsOuter = mapToShards(smallShardsOuter, 0.5);

  return (
    <>
      <Image texture={duckTexture} x={0} y={0} rotation={0} height={5.5} />
      {bigSpriteElements}
      {mediumSpriteElements}
      {smallSpriteElementsInner}
      {smallSpriteElementsOuter}
    </>
  );
};

type ImageProps = {
  texture: Texture;
  x: number;
  y: number;
  height: number;
  rotation?: number;
};

const Image = ({ texture, x, y, height, rotation }: ImageProps) => {
  // either sets rotation from input or rotates it pointing to the center
  const actualRotation = rotation ?? Math.atan2(y, x) + 3 * (Math.PI / 2);
  const imageWidth = texture.image.width;
  const imageHeight = texture.image.height;

  const scaledWidth = (imageWidth / imageHeight) * height;

  return (
    <mesh
      scale={[scaledWidth, height, 1]}
      position={[x, y, 0]}
      rotation={[0, 0, actualRotation]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.08} />
    </mesh>
  );
};

type SpriteConfig = Array<{
  type: "shard1" | "shard2" | "feather";
  x: number;
  y: number;
  rotation?: number;
}>;

const bigShards: SpriteConfig = [
  {
    type: "shard1",
    x: 3,
    y: 3,
  },
  {
    type: "shard2",
    x: 0,
    y: 3.9,
  },
  {
    type: "shard1",
    x: -3,
    y: 2.7,
  },
  {
    type: "shard2",
    x: -4,
    y: 0,
  },
  {
    type: "shard1",
    x: -3,
    y: -3,
  },
  {
    type: "shard2",
    x: 1,
    y: -2.5,
  },
  {
    type: "shard1",
    x: -0.5,
    y: -3.4,
  },
  {
    type: "shard2",
    x: 3,
    y: -3.2,
  },
  {
    type: "shard1",
    x: 4,
    y: 0,
  },
];

const mediumShards: SpriteConfig = [
  {
    type: "feather",
    x: 3.4,
    y: 1.6,
  },
  {
    type: "shard2",
    x: 3.6,
    y: -1.5,
  },
  {
    type: "feather",
    x: 2,
    y: -2.7,
  },
  {
    type: "shard2",
    x: 1,
    y: -3.5,
  },
  {
    type: "shard2",
    x: 0,
    y: -2.5,
  },
  {
    type: "feather",
    x: -2,
    y: -3.7,
  },
  {
    type: "feather",
    x: -3.9,
    y: -1.7,
  },
  {
    type: "shard2",
    x: -3.9,
    y: 1.7,
  },
  {
    type: "feather",
    x: -1.2,
    y: 3.2,
  },
  {
    type: "shard1",
    x: 1.4,
    y: 3.7,
  },
];

const smallShardsInner: SpriteConfig = [
  {
    type: "feather",
    x: 3.2,
    y: 2.4,
  },
  {
    type: "shard1",
    x: 2.2,
    y: 3.2,
  },
  {
    type: "feather",
    x: 0.7,
    y: 3.2,
  },
  {
    type: "shard2",
    x: -1.7,
    y: 3.2,
  },
  {
    type: "shard2",
    x: -2.9,
    y: 2,
  },
  {
    type: "shard1",
    x: -3.4,
    y: 0.6,
  },
  {
    type: "feather",
    x: -3.7,
    y: -0.8,
  },
  {
    type: "shard2",
    x: -3.2,
    y: -2,
  },
  {
    type: "shard1",
    x: -1.4,
    y: -3,
  },
  {
    type: "feather",
    x: 0.5,
    y: -3,
  },
  {
    type: "shard1",
    x: 1.5,
    y: -3.5,
  },
  {
    type: "feather",
    x: 2.5,
    y: -3.5,
  },
  {
    type: "shard2",
    x: 3,
    y: -2.2,
  },
  {
    type: "feather",
    x: 3.4,
    y: -0.7,
  },
  {
    type: "shard2",
    x: 3.4,
    y: 0.7,
  },
];

const smallShardsOuter: SpriteConfig = [
  {
    type: "shard2",
    x: 4.3,
    y: 1.4,
  },
  {
    type: "shard2",
    x: 4,
    y: 3.5,
  },
  {
    type: "feather",
    x: 3,
    y: 4.2,
  },
  {
    type: "shard1",
    x: 1,
    y: 4.6,
  },
  {
    type: "shard2",
    x: -1.5,
    y: 4.6,
  },
  {
    type: "feather",
    x: -4.3,
    y: 2.6,
  },
  {
    type: "shard1",
    x: -4.9,
    y: 0.6,
  },
  {
    type: "feather",
    x: -4.3,
    y: -2.6,
  },
  {
    type: "shard2",
    x: -1.3,
    y: -4,
  },
  {
    type: "shard2",
    x: 4.3,
    y: -2.6,
  },
  {
    type: "feather",
    x: 4.9,
    y: -0.6,
  },
];
