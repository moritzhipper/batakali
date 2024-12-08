import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { projectList } from "../config/projectList"
import { Project } from "../types"
import {
  prioritizeByTag,
  selectAndPlayProjectByName,
  selectNextProject,
  selectPreviousProject,
  selectProjectByName
} from "./audioStateReducers"

export type AudioState = {
  isPlaying: boolean
  isLooping: boolean
  selectedProject: Project
  reelFocusProject: string
  projectList: Project[]
  audio: HTMLAudioElement
  selectedTag: string | null
  setSelectedProject: (name: string) => void
  selectAndPlayProject: (name: string) => void
  setReelFocusProject: (name: string) => void
  selectTag: (tag: string) => void
  togglePlay: () => void
  pause: () => void
  play: () => void
  toggleLoop: () => void
  skip: (time: number) => void
  selectNext: () => void
  selectPrevious: () => void
}

const initialProject = projectList[0]

const initialState = {
  isPlaying: false,
  selectedProject: initialProject,
  focusedProjectName: initialProject.name,
  reelFocusProject: initialProject.name,
  projectList: projectList,
  selectedTag: null,
  isLooping: false,
  audio: new Audio(initialProject.fileName)
}

export const useAudioStore = create<AudioState>()(
  devtools((set, get) => ({
    ...initialState,
    setSelectedProject: (name: string) =>
      set((state) => selectProjectByName(name, state)),
    selectAndPlayProject: (name: string) =>
      set((state) => selectAndPlayProjectByName(name, state)),
    selectTag: (tag: string) => set((state) => prioritizeByTag(tag, state)),
    setReelFocusProject: (name: string) =>
      set((state) => ({ ...state, reelFocusProject: name })),
    togglePlay: () =>
      set((state) => ({ ...state, isPlaying: !state.isPlaying })),
    toggleLoop: () =>
      set((state) => ({ ...state, isLooping: !state.isLooping })),
    pause: () => set((state) => ({ ...state, isPlaying: false })),
    play: () => set((state) => ({ ...state, isPlaying: true })),
    skip: (time) => (get().audio.currentTime += time),
    selectNext: () => set((state) => selectNextProject(state)),
    selectPrevious: () => set((state) => selectPreviousProject(state))
  }))
)
