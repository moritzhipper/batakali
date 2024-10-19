import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Texture, TextureLoader } from "three";
import duck from "../assets/images/duck.png";
import feather from "../assets/images/feather.png";
import shard from "../assets/images/shard.png";

export const Ducko = () => {
  const duckMap = useLoader(TextureLoader, duck);
  const featherMap = useLoader(TextureLoader, feather);
  const shardMap = useLoader(TextureLoader, shard);

  return (
    <>
      <Image texture={duckMap} />
      <Image texture={featherMap} />
      <Image texture={shardMap} />
    </>
  );
};

type Props = {
  texture: Texture;
};

const Image = ({ texture }: Props) => {
  const [aspectRatio, setAspectRatio] = useState({ x: 1, y: 1 });
  const scale = 0.0075;

  useEffect(() => {
    const { width, height } = texture.image;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    setAspectRatio({ x: scaledWidth, y: scaledHeight }); // Calculate aspect ratio setAspectRatio
    console.log(aspectRatio);
  }, [texture]);

  return (
    <mesh scale={[aspectRatio.x, aspectRatio.y, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.88} />
    </mesh>
  );
};
