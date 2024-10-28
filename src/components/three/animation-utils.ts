import { duckoSzenes } from "../../angry-ducko-config"
import { DuckoSzeneConfig } from "../../types"

export const getConfigForRoute = (route?: string): DuckoSzeneConfig => {
  if (!route) return defaultSzene

  const relevantSzene = duckoSzenes[route]
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

const defaultSzene: DuckoSzeneConfig = {
  ducko: {
    shardsVisible: true,
    animateFloating: true
  },
  camera: {
    position: [0, 0, 10],
    lookAt: [0, 0, 0]
  }
}
