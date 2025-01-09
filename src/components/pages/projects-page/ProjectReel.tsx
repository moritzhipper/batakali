import { a, useSprings } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useEffect, useRef } from "react"
import { springConfig } from "../../../config/szeneConfig"
import { useAudioStore } from "../../../state/audioState"
import { Project } from "../../../types"
import { useMediaQuery } from "../../../useMediaHook"
import { DownloadLink } from "../../action-buttons/DownloadLink"
import { PlayPauseButton } from "../../action-buttons/PlayPauseButton"
import { ShareButton } from "../../action-buttons/ShareButton"
import "./ProjectReel.css"

export const ProjectReel = () => {
  const {
    projectList,
    setSelectedProject,
    selectedProject,
    play,
    togglePlay,
    isPlaying,
    setReelFocusProject,
    reelFocusProject,
    selectedTag
  } = useAudioStore()

  const isMobile = useMediaQuery("(max-width: 700px)")
  const projectCount = projectList.length
  const itemOffset = isMobile ? 45 : 150
  const dragScale = isMobile ? 0.4 : 1
  const wheelScale = 0.2

  const focusIndex = getProjectIndex(projectList, reelFocusProject)
  const currentScrollPos = useRef(focusIndex * itemOffset * -1)

  useEffect(() => {
    focusCard(focusIndex)
  }, [selectedTag])

  // used to calculate scroll position relative to selected card
  const getTrueScrollPos = (offset: number) => offset + currentScrollPos.current

  // returns percentage of offset between 0 and maxDistance
  const getPercentByDistance = (offset: number, maxDistance: number) =>
    offset / (itemOffset * maxDistance)

  // returns percentage of offset between 0 and maxDistance, only returning positive values
  const getAbsPercentByDistance = (offset: number, maxDistance: number) =>
    Math.abs(offset / (itemOffset * maxDistance))

  // maps scroll position to index
  const toIndex = (num: number) => {
    const rounded = Math.round(num) * -1
    return Math.max(0, Math.min(rounded, projectCount - 1))
  }

  // return distance between current index and index
  const getRelativeOffsetForCurrentIndex = (index: number) =>
    (index - focusIndex) * itemOffset

  // returns style object for each project index
  const calcStyle = (i: number, offset: number) => {
    let offsetX = i * itemOffset + getTrueScrollPos(offset)

    // prohibit scroll on first last list item
    if (
      (focusIndex === projectCount - 1 && offset < 0) ||
      (focusIndex === 0 && offset > 0)
    ) {
      offsetX = getRelativeOffsetForCurrentIndex(i)
    }

    return {
      x: offsetX,
      scale: 1 - getAbsPercentByDistance(offsetX, 7),
      rotateZ: getPercentByDistance(offsetX, 3) * 5,
      opacityContent: 1 - getAbsPercentByDistance(offsetX, 1),
      opacityBody: 1 - getAbsPercentByDistance(offsetX, 3)
    }
  }

  const scroll = (offset: number): void => {
    const newI = toIndex(getTrueScrollPos(offset) / itemOffset)
    if (newI !== focusIndex) setReelFocusProject(projectList[newI].name)

    api.start((i) => calcStyle(i, offset))
  }

  const snap = (): void => {
    currentScrollPos.current = focusIndex * itemOffset * -1
    api.start((i) => calcStyle(i, 0))
  }

  const focusCard = (i: number): void => {
    currentScrollPos.current = i * itemOffset * -1
    setReelFocusProject(projectList[i].name)

    api.start((i) => calcStyle(i, 0))
  }

  const [props, api] = useSprings(projectCount, (i) => ({
    ...calcStyle(i, 0),
    ...springConfig
  }))

  const bind = useGesture({
    onDrag: (state) => scroll(state.movement[0] * dragScale),
    onDragEnd: () => snap(),
    onWheel: (state) => scroll(state.movement[1] * wheelScale),
    onWheelEnd: () => snap()
  })

  const playProject = (name: string) => {
    if (selectedProject.name === name) {
      togglePlay()
    } else {
      setSelectedProject(name)
      play()
    }
  }

  const checkIfPlaying = (name: string) =>
    name === selectedProject.name && isPlaying

  return (
    <div className="project-reel-wrapper" {...bind()}>
      {props.map(({ x, scale, rotateZ, opacityBody, opacityContent }, i) => (
        <a.div
          className={`project ${focusIndex === i ? "focus" : ""}`}
          style={{
            x,
            scale,
            rotateZ,
            opacity: opacityBody
          }}
          key={i}
          onFocus={() => focusCard(i)}
        >
          <a.div className="content" style={{ opacity: opacityContent }}>
            <ProjectCardContent
              project={projectList[i]}
              isPlaying={checkIfPlaying(projectList[i].name)}
              playProject={playProject}
            />
          </a.div>
        </a.div>
      ))}
    </div>
  )
}

type ProjectCardProps = {
  project: Project
  isPlaying: boolean
  playProject: (name: string) => void
}
const ProjectCardContent = ({
  project,
  isPlaying,
  playProject
}: ProjectCardProps) => {
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
