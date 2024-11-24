import { a, useSprings } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useRef } from "react"
import { springConfig } from "../../../duckoSzeneConfig"
import { useAudioStore } from "../../../state/audioState"
import { Project } from "../../../types"
import { useMediaQuery } from "../../../useMediaHook"
import { DownloadLink } from "../../action-buttons/DownloadLink"
import { PlayPauseButton } from "../../action-buttons/PlayPauseButton"
import { ShareButton } from "../../action-buttons/ShareButton"
import "./ProjectReel.css"

export const ProjectReel = () => {
  const { projectList, selectProject, togglePlay, isPlaying, selectedProject } =
    useAudioStore()

  const isMobile = useMediaQuery("(max-width: 700px)")
  const projectCount = projectList.length
  const itemOffset = isMobile ? 40 : 80
  const dragScale = isMobile ? 0.4 : 1
  const wheelScale = 0.2

  const currentIndex = useRef(
    getProjectIndex(projectList, selectedProject.name)
  )
  const currentScrollPos = useRef(currentIndex.current * itemOffset * -1)

  // used to calculate scroll position relative to selected card
  const getTrueScrollPos = (offset: number) => offset + currentScrollPos.current

  // returns percentage of offset between 0 and maxDistance
  const getPercentByDistance = (offset: number, maxDistance: number) =>
    Math.abs(offset / (itemOffset * maxDistance))

  // maps scroll position to index
  const toIndex = (num: number) => {
    const rounded = Math.round(num) * -1
    return Math.max(0, Math.min(rounded, projectCount - 1))
  }

  // return distance between current index and index
  const getRelativeOffsetForCurrentIndex = (index: number) =>
    (index - currentIndex.current) * itemOffset

  // returns style object for each project index
  const getStyle = (i: number, offset: number) => {
    let offsetX = i * itemOffset + getTrueScrollPos(offset)

    // prohibit scroll on first last list item
    if (
      (currentIndex.current === projectCount - 1 && offset < 0) ||
      (currentIndex.current === 0 && offset > 0)
    ) {
      offsetX = getRelativeOffsetForCurrentIndex(i)
    }

    const pointerEvents = currentIndex.current !== i ? "none" : "all"
    const hideBody = currentIndex.current > i || currentIndex.current < i - 2
    return {
      x: offsetX,
      scale: 1 - getPercentByDistance(offsetX, 7),
      rotateZ: getPercentByDistance(offsetX, 3) * 5,
      opacityContent: 1 - getPercentByDistance(offsetX, 1),
      opacityBody: hideBody ? 0 : 1,
      zIndex: hideBody ? -1 : 1,
      pointerEvents
    }
  }

  const scroll = (offset: number): void => {
    currentIndex.current = toIndex(getTrueScrollPos(offset) / itemOffset)
    api.start((i) => getStyle(i, offset))
  }

  const snap = (): void => {
    currentScrollPos.current = currentIndex.current * itemOffset * -1
    api.start((i) => getStyle(i, 0))
  }

  const focusCard = (i: number): void => {
    currentIndex.current = i
    currentScrollPos.current = currentIndex.current * itemOffset * -1

    api.start((i) => getStyle(i, 0))
  }

  const [props, api] = useSprings(projectCount, (i) => ({
    ...getStyle(i, 0),
    ...springConfig
  }))

  const bind = useGesture({
    onDrag: (state) => scroll(state.movement[0] * dragScale),
    onDragEnd: () => snap(),
    onWheel: (state) => scroll(state.movement[1] * wheelScale),
    onWheelEnd: () => snap()
  })

  const playProject = (name: string) => {
    selectProject(name)
  }

  const checkIfPlaying = (name: string) =>
    name === selectedProject.name && isPlaying

  return (
    <>
      <div className="project-reel-wrapper" {...bind()}>
        {props.map(
          (
            { x, scale, rotateZ, opacityBody, opacityContent, pointerEvents },
            i
          ) => (
            <a.div
              className="project"
              style={{
                x,
                scale,
                rotateZ,
                opacity: opacityBody,
                zIndex: projectCount - i,
                pointerEvents
              }}
              key={i}
              onFocus={() => focusCard(i)}
            >
              <a.div className="content" style={{ opacity: opacityContent }}>
                <ProjectCard
                  project={projectList[i]}
                  isPlaying={checkIfPlaying(projectList[i].name)}
                  playProject={playProject}
                />
              </a.div>
            </a.div>
          )
        )}
      </div>
    </>
  )
}

type ProjectCardProps = {
  project: Project
  isPlaying: boolean
  playProject: (name: string) => void
}
const ProjectCard = ({ project, isPlaying, playProject }: ProjectCardProps) => {
  return (
    <>
      <div className="info">
        <div className="name">{project.name}</div>
        <div className="tag">{project.tag}</div>
      </div>
      <PlayPauseButton
        isPlaying={isPlaying}
        onClick={() => playProject(project.name)}
        className="play"
      />
      <div className="buttons">
        <DownloadLink filePath={project.fileName} />
        <ShareButton projectName={project.name} />
      </div>
    </>
  )
}

const getProjectIndex = (projectList: Project[], name: string) => {
  if (!projectList.some((project) => project.name === name)) return 0
  return projectList.findIndex((project) => project.name === name)
}
