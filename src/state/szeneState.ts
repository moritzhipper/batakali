import { create } from "zustand"
import { duckoSzenes } from "../duckoSzeneConfig"
import { DuckoSzeneConfig } from "../types"

type SzeneState = {
  activeSzene: DuckoSzeneConfig
  setActiveSzene: (szeneName: string) => void
}

const defaultSzene: DuckoSzeneConfig = {
  ducko: {
    shardsVisible: true,
    animateFloating: true,
    dim: true
  },
  camera: {
    position: [0, 0, 10],
    lookAt: [0, 0, 0]
  }
}

const getConfigByName = (name?: string): DuckoSzeneConfig => {
  if (!name) return defaultSzene

  const relevantSzene = duckoSzenes[name]
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

export const useSzeneState = create<SzeneState>((set) => ({
  activeSzene: getConfigByName(),
  setActiveSzene: (name: string) => set({ activeSzene: getConfigByName(name) })
}))
