export type SpriteConfig = {
  height: number
  instances: Array<{
    textureIndex: number
    x: number
    y: number
    rotation?: number
  }>
}

export const bigShards: SpriteConfig = {
  height: 1,
  instances: [
    {
      textureIndex: 1,
      x: 3,
      y: 3,
    },
    {
      textureIndex: 2,
      x: 0,
      y: 3.9,
    },
    {
      textureIndex: 1,
      x: -3,
      y: 2.7,
    },
    {
      textureIndex: 2,
      x: -4,
      y: 0,
    },
    {
      textureIndex: 1,
      x: -3,
      y: -3,
    },
    {
      textureIndex: 2,
      x: 1,
      y: -2.5,
    },
    {
      textureIndex: 1,
      x: -0.5,
      y: -3.4,
    },
    {
      textureIndex: 2,
      x: 3,
      y: -3.2,
    },
    {
      textureIndex: 1,
      x: 4,
      y: 0,
    },
  ],
}

export const mediumShards: SpriteConfig = {
  height: 0.8,
  instances: [
    {
      textureIndex: 0,
      x: 3.4,
      y: 1.6,
    },
    {
      textureIndex: 2,
      x: 3.6,
      y: -1.5,
    },
    {
      textureIndex: 0,
      x: 2,
      y: -2.7,
    },
    {
      textureIndex: 2,
      x: 1,
      y: -3.5,
    },
    {
      textureIndex: 2,
      x: 0,
      y: -2.5,
    },
    {
      textureIndex: 0,
      x: -2,
      y: -3.7,
    },
    {
      textureIndex: 0,
      x: -3.9,
      y: -1.7,
    },
    {
      textureIndex: 2,
      x: -3.9,
      y: 1.7,
    },
    {
      textureIndex: 0,
      x: -1.2,
      y: 3.2,
    },
    {
      textureIndex: 1,
      x: 1.4,
      y: 3.7,
    },
  ],
}

export const smallShardsInner: SpriteConfig = {
  height: 0.5,
  instances: [
    {
      textureIndex: 0,
      x: 3.2,
      y: 2.4,
    },
    {
      textureIndex: 1,
      x: 2.2,
      y: 3.2,
    },
    {
      textureIndex: 0,
      x: 0.7,
      y: 3.2,
    },
    {
      textureIndex: 2,
      x: -1.7,
      y: 3.2,
    },
    {
      textureIndex: 2,
      x: -2.9,
      y: 2,
    },
    {
      textureIndex: 1,
      x: -3.4,
      y: 0.6,
    },
    {
      textureIndex: 0,
      x: -3.7,
      y: -0.8,
    },
    {
      textureIndex: 2,
      x: -3.2,
      y: -2,
    },
    {
      textureIndex: 1,
      x: -1.4,
      y: -3,
    },
    {
      textureIndex: 0,
      x: 0.5,
      y: -3,
    },
    {
      textureIndex: 1,
      x: 1.5,
      y: -3.5,
    },
    {
      textureIndex: 0,
      x: 2.5,
      y: -3.5,
    },
    {
      textureIndex: 2,
      x: 3,
      y: -2.2,
    },
    {
      textureIndex: 0,
      x: 3.4,
      y: -0.7,
    },
    {
      textureIndex: 2,
      x: 3.4,
      y: 0.7,
    },
  ],
}

export const smallShardsOuter: SpriteConfig = {
  height: 0.5,
  instances: [
    {
      textureIndex: 2,
      x: 4.3,
      y: 1.4,
    },
    {
      textureIndex: 2,
      x: 4,
      y: 3.5,
    },
    {
      textureIndex: 0,
      x: 3,
      y: 4.2,
    },
    {
      textureIndex: 1,
      x: 1,
      y: 4.6,
    },
    {
      textureIndex: 2,
      x: -1.5,
      y: 4.6,
    },
    {
      textureIndex: 0,
      x: -4.3,
      y: 2.6,
    },
    {
      textureIndex: 1,
      x: -4.9,
      y: 0.6,
    },
    {
      textureIndex: 0,
      x: -4.3,
      y: -2.6,
    },
    {
      textureIndex: 2,
      x: -1.3,
      y: -4,
    },
    {
      textureIndex: 2,
      x: 4.3,
      y: -2.6,
    },
    {
      textureIndex: 0,
      x: 4.9,
      y: -0.6,
    },
  ],
}
