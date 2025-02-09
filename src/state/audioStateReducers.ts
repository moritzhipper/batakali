import { Project } from "../types"
import { AudioState } from "./audioState"

export const selectProjectByName = (
  name: string,
  state: AudioState
): AudioState => ({
  ...state,
  selectedProject: getProjectByName(name, state),
  reelFocusProject: name
})

export const selectAndPlayProjectByName = (
  name: string,
  state: AudioState
): AudioState => ({
  ...state,
  selectedProject: getProjectByName(name, state),
  isPlaying: true
})

export const prioritizeByTag = (tag: string, state: AudioState): AudioState => {
  const prioritizedProjects = sortProjectListByTag(state.projectList, tag)

  return {
    ...state,
    selectedTag: tag,
    projectList: prioritizedProjects,
    reelFocusProject: prioritizedProjects[0].name
  }
}

export const selectNextProject = (state: AudioState): AudioState => {
  const index = getSelectedProjectIndex(state)
  const hasNextProejct = index < state.projectList.length - 1
  const nextProject = hasNextProejct
    ? state.projectList[index + 1]
    : state.projectList[0]

  return {
    ...state,
    selectedProject: nextProject
  }
}

export const selectPreviousProject = (state: AudioState): AudioState => {
  const index = getSelectedProjectIndex(state)
  const hasPreviousProject = index !== 0
  const previousProject = hasPreviousProject
    ? state.projectList[index - 1]
    : state.projectList[state.projectList.length - 1]

  return {
    ...state,
    selectedProject: previousProject
  }
}

export const setProjectEverywhere = (
  name: string,
  state: AudioState
): AudioState => {
  const project = state.projectList.find((project) => project.name === name)
  if (!project) return state

  const tag = project.tag
  const sortedProjects = sortProjectListByTag(state.projectList, tag)

  // moves target project to the front of the list
  sortedProjects.unshift(
    sortedProjects.splice(
      sortedProjects.findIndex((p) => p.name === project.name),
      1
    )[0]
  )

  return {
    ...state,
    selectedProject: project,
    reelFocusProject: project.name,
    selectedTag: project.tag,
    projectList: sortedProjects
  }
}

// helper functions
const getSelectedProjectIndex = (state: AudioState): number =>
  state.projectList.findIndex(
    (project) => project.name === state.selectedProject.name
  )

const getProjectByName = (name: string, state: AudioState): Project =>
  state.projectList.find((project) => project.name === name) ??
  state.projectList[0]

const sortProjectListByTag = (projects: Project[], tag: string): Project[] => [
  ...projects.filter((project) => project.tag === tag),
  ...projects.filter((project) => project.tag !== tag)
]
