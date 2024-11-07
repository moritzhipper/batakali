import { create } from "zustand"
import { projectList } from "./project-list"
import { Project } from "./types"

type MediaStore = {
  isPlaying: boolean
  isRepeating: boolean
  selectedProject: Project | null
  projectList: Project[]
  selectedTag: string | null
  selectProject: (name: string) => void
  selectTag: (name: string) => void
  togglePlay: () => void
  toggleRepeat: () => void
}

export const useMediaStore = create<MediaStore>((set) => ({
  isPlaying: false,
  selectedProject: null,
  projectList: projectList,
  selectedTag: null,
  isRepeating: false,
  selectProject: (name: string) =>
    set((state) => ({
      ...state,
      selectedProject: findByName(state.projectList, name)
    })),
  selectTag: (name: string) =>
    set((state) => ({
      ...state,
      selectedTag: name,
      projectList: prioritizeProjectsByTag(name, state.projectList)
    })),
  togglePlay: () => set((state) => ({ ...state, isPlaying: !state.isPlaying })),
  toggleRepeat: () =>
    set((state) => ({ ...state, isRepeating: !state.isRepeating }))
}))

const findByName = (
  projectList: Project[],
  name: string
): Project | undefined => projectList.find((project) => project.name === name)

const prioritizeProjectsByTag = (
  tag: string,
  projects: Project[]
): Project[] => [
  ...projects.filter((project) => project.tag === tag),
  ...projects.filter((project) => project.tag !== tag)
]
