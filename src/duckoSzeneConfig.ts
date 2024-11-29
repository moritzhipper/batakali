import { config } from "@react-spring/core"
import { DeepPartial, DuckoSzeneConfig } from "./types"

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
