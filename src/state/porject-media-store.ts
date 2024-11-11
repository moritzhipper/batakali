import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { projectList } from "../project-list"
import { Project } from "../types"

type MediaStore = {
  isPlaying: boolean
  isLooping: boolean
  selectedProject: Project
  projectList: Project[]
  audio: HTMLAudioElement
  selectedTag: string | null
  selectProject: (name: string) => void
  skipProject: (next: boolean) => void
  selectTag: (name: string) => void
  togglePlay: () => void
  toggleLoop: () => void
  pause: () => void
  skip: (time: number) => void
}

const initialState = {
  isPlaying: false,
  selectedProject: projectList[0],
  projectList: projectList,
  selectedTag: null,
  isLooping: false,
  audio: new Audio(projectList[0].fileName)
}

export const useMediaStore = create<MediaStore>()(
  devtools((set, get) => ({
    ...initialState,
    selectProject: (name: string) =>
      set((state) => {
        if (name === state.selectedProject.name) return state

        console.log("selected project: ", name)
        return {
          ...state,
          selectedProject: selectProjectByName(state.projectList, name)
        }
      }),
    selectTag: (name: string) =>
      set((state) => ({
        ...state,
        selectedTag: name,
        projectList: prioritizeProjectsByTag(name, state.projectList)
      })),
    togglePlay: () =>
      set((state) => ({ ...state, isPlaying: !state.isPlaying })),
    toggleLoop: () =>
      set((state) => ({ ...state, isLooping: !state.isLooping })),
    skip: (time) => {
      console.log("skip: ", time)

      get().audio.currentTime += time
    },
    pause: () => set((state) => ({ ...state, isPlaying: false })),
    skipProject: (next) =>
      set((state) => {
        if (next) {
          return {
            ...state,
            selectedProject: selectNextProject(
              state.projectList,
              state.selectedProject.name
            )
          }
        } else {
          return {
            ...state,
            selectedProject: selectPreviousProject(
              state.projectList,
              state.selectedProject.name
            )
          }
        }
      })
  }))
)

const getProjectIndex = (projectList: Project[], name: string) =>
  projectList.findIndex((project) => project.name === name)

const selectProjectByName = (
  projectList: Project[],
  name: string
): Project | undefined => projectList.find((project) => project.name === name)

const selectNextProject = (
  projectList: Project[],
  currentName: string
): Project => {
  const index = getProjectIndex(projectList, currentName)
  if (index < projectList.length - 1) {
    return projectList[index + 1]
  } else {
    return projectList[0]
  }
}

const selectPreviousProject = (
  projectList: Project[],
  currentName: string
): Project => {
  const index = getProjectIndex(projectList, currentName)
  if (index !== 0) {
    return projectList[index - 1]
  } else {
    return projectList[projectList.length - 1]
  }
}

const prioritizeProjectsByTag = (
  tag: string,
  projects: Project[]
): Project[] => [
  ...projects.filter((project) => project.tag === tag),
  ...projects.filter((project) => project.tag !== tag)
]
