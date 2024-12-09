import { config } from "@react-spring/core"
import { DeepPartial, DuckoSpriteConfig, DuckoSzeneConfig } from "../types"
import { buildSpriteConfig } from "./utils"

export const springConfig = { config: config.gentle }

export const duckoSzenes: Record<string, DeepPartial<DuckoSzeneConfig>> = {
  "/": {
    ducko: {
      shardsVisible: false,
      animateFloating: false,
      dim: false
    },
    camera: {
      position: [-1, -1, 4],
      lookAt: [0, -0.1, 0]
    }
  },
  "/projects": {
    camera: {
      position: [-2, -3, 10],
      lookAt: [0, -2, 0]
    },
    ducko: {
      dim: false
    }
  },
  duck: {
    camera: {
      position: [-3, -2, 6],
      lookAt: [0, 0, 0]
    },
    ducko: {
      dim: false
    }
  },
  "/archive": {
    camera: {
      position: [1, -2, 5],
      lookAt: [-1, 0, 0]
    }
  },
  "/about": {
    ducko: {
      shardsVisible: false
    },
    camera: {
      position: [1, -0.5, 3],
      lookAt: [0, 0, 0]
    }
  },
  "/privacy": {
    ducko: {
      shardsVisible: false
    },
    camera: {
      position: [-2, -2, 5],
      lookAt: [0, 0, 0]
    }
  },
  "/imprint": {
    ducko: {
      shardsVisible: false
    },
    camera: {
      position: [2, -2, 5],
      lookAt: [0, 0, 0]
    }
  }
}

export const duckSpritesPainty: DuckoSpriteConfig = buildSpriteConfig(
  "painty",
  "duck",
  ["bling", "heart_1", "heart_2"]
)

export const duckSpritesCreepy: DuckoSpriteConfig = buildSpriteConfig(
  "creepy",
  "duck_teeth",
  ["heart", "purple_heart"]
)

export const duckSpritesAngry: DuckoSpriteConfig = buildSpriteConfig(
  "angry",
  "duck",
  ["feather", "shard1", "shard2"]
)
