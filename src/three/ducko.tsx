import { useLoader } from "@react-three/fiber";
import { Texture, TextureLoader } from "three";
import duck from "../assets/images/duck.png";
import feather from "../assets/images/feather.png";
import shard1 from "../assets/images/shard1.png";
import shard2 from "../assets/images/shard2.png";
import { randomRadian } from "./utils";

export const Ducko = () => {
  const duckTexture = useLoader(TextureLoader, duck);
  const textureMaps = {
    feather: useLoader(TextureLoader, feather),
    shard1: useLoader(TextureLoader, shard1),
    shard2: useLoader(TextureLoader, shard2),
  };

  const bigSpriteElements = bigShards.map((sprite, i) => (
    <Image
      x={sprite.x}
      y={sprite.y}
      texture={textureMaps[sprite.type]}
      scale={1.5}
      key={i}
    />
  ));

  const mediumSpriteElements = mediumShards.map((sprite, i) => (
    <Image
      x={sprite.x}
      y={sprite.y}
      texture={textureMaps[sprite.type]}
      scale={1}
      key={i}
    />
  ));

  const smallSpriteElements = smallShards.map((sprite, i) => (
    <Image
      x={sprite.x}
      y={sprite.y}
      texture={textureMaps[sprite.type]}
      scale={0.4}
      key={i}
    />
  ));

  return (
    <>
      <Image texture={duckTexture} x={0} y={0} rotation={0} scale={1} />
      {bigSpriteElements}
      {mediumSpriteElements}
      {smallSpriteElements}
    </>
  );
};

type ImageProps = {
  texture: Texture;
  x: number;
  y: number;
  scale: number;
  rotation?: number;
};

const Image = ({ texture, x, y, scale, rotation }: ImageProps) => {
  const actualScale = scale * 0.0075;
  const actualRotation = rotation ?? randomRadian();
  const { width, height } = texture.image;
  const scaledWidth = width * actualScale;
  const scaledHeight = height * actualScale;

  return (
    <mesh
      scale={[scaledWidth, scaledHeight, 1]}
      position={[x, y, 0]}
      rotation={[0, 0, actualRotation]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.88} />
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
    type: "feather",
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
    type: "feather",
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

const smallShards: SpriteConfig = [
  {
    type: "feather",
    x: 3.4,
    y: 1.6,
  },
];
