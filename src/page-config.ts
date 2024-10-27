import { config } from "@react-spring/three"
import { DeepPartial, DuckoSzeneConfig } from "./types"

export const springConfig = { config: config.slow }

export const duckoSzenes: Record<string, DeepPartial<DuckoSzeneConfig>> = {
  "/": {
    ducko: {
      shardsVisible: false,
      animateFloating: false
    },
    camera: {
      position: [0, 0, 10],
      lookAt: [0, 0, 0]
    }
  },
  "/projects": {
    camera: {
      position: [0, -4, 10],
      lookAt: [0, -2, 0]
    }
  },
  "/about": {
    ducko: {
      shardsVisible: false
    },
    camera: {
      position: [-2, 1, 3],
      lookAt: [0, 0, 0]
    }
  },
  "/duck": {
    camera: {
      position: [0, 0, 12],
      lookAt: [0, 0, 0]
    }
  },
  "/imprint": {
    ducko: {
      shardsVisible: false
    },
    camera: {
      position: [-2, -2, 5],
      lookAt: [0, 0, 0]
    }
  },
  "/privacy": {
    ducko: {
      shardsVisible: false
    },
    camera: {
      position: [2, -2, 5],
      lookAt: [0, 0, 0]
    }
  }
}
