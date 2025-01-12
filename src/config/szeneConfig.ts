import { config } from "@react-spring/core"
import { DeepPartial, DuckoSzeneConfig } from "../types"

export const springConfig = { config: config.gentle }

export const duckoSzenesRecord: Record<
  string,
  DeepPartial<DuckoSzeneConfig>
> = {
  "/": {
    ducko: {
      showShards: false,
      dim: false
    },
    camera: {
      position: [-1, -1, 4],
      lookAt: [0, -0.1, 0]
    }
  },
  "/projects": {
    camera: {
      position: [-2, -4, 10],
      lookAt: [0, -2, 0]
    },
    ducko: {
      dim: false
    }
  },
  duck: {
    camera: {
      position: [-2, -2, 8],
      lookAt: [0, -0.3, 0]
    },
    ducko: {
      dim: false
    }
  },
  "/archive": {
    camera: {
      position: [1, -2, 5],
      lookAt: [-1, 0, 0]
    },
    ducko: {
      showShards: false
    }
  },
  "/about": {
    ducko: {
      showShards: false
    },
    camera: {
      position: [1, -0.5, 3],
      lookAt: [0, 0, 0]
    }
  },
  "/privacy": {
    ducko: {
      showShards: false
    },
    camera: {
      position: [-2, -2, 5],
      lookAt: [0, 0, 0]
    }
  },
  "/imprint": {
    ducko: {
      showShards: false
    },
    camera: {
      position: [2, -2, 5],
      lookAt: [0, 0, 0]
    }
  }
}

const defaultSzene: DuckoSzeneConfig = {
  ducko: {
    showShards: true,
    dim: true
  },
  camera: {
    position: [0, 0, 10],
    lookAt: [0, 0, 0]
  }
}

export const getConfigByName = (name?: string): DuckoSzeneConfig => {
  if (!name) return defaultSzene

  const relevantSzene = duckoSzenesRecord[name]
  return {
    ducko: {
      ...defaultSzene.ducko,
      ...relevantSzene.ducko
    },
    camera: {
      ...defaultSzene.camera,
      ...relevantSzene.camera
    }
  } as DuckoSzeneConfig
}
