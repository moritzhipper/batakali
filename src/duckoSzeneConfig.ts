import { config } from "@react-spring/three"
import { DeepPartial, DuckoSzeneConfig } from "./types"

export const springConfig = { config: config.gentle }

export const duckoSzenes: Record<string, DeepPartial<DuckoSzeneConfig>> = {
  "/": {
    ducko: {
      shardsVisible: false,
      animateFloating: false,
      dim: true
    },
    camera: {
      position: [-1, -1, 4],
      lookAt: [0, 0, 0]
    }
  },
  "/projects": {
    camera: {
      position: [-2, -3, 10],
      lookAt: [0, -2, 0]
    }
  },
  "/about": {
    ducko: {
      shardsVisible: false,
      dim: true
    },
    camera: {
      position: [-2, 1, 3],
      lookAt: [0, 0, 0]
    }
  },
  "/archive": {
    camera: {
      position: [1, -3, 5],
      lookAt: [-1, 0, 0]
    },
    ducko: {
      dim: true
    }
  },
  duck: {
    camera: {
      position: [-3, -2, 6],
      lookAt: [0, 0, 0]
    }
  },
  "/privacy": {
    ducko: {
      shardsVisible: false,
      dim: true
    },
    camera: {
      position: [-2, -2, 5],
      lookAt: [0, 0, 0]
    }
  },
  "/imprint": {
    ducko: {
      shardsVisible: false,
      dim: true
    },
    camera: {
      position: [2, -2, 5],
      lookAt: [0, 0, 0]
    }
  }
}
