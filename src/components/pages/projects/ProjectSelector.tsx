import { a, useSprings } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useRef } from "react"
import { Project } from "../../../types"
import "./ProjectSelector.css"

const projects: Project[] = [
  { name: "born into this", tag: "rnb" },
  { name: "no name", tag: "synthwave" },
  { name: "run", tag: "hardtechno" },
  { name: "water", tag: "boombap" },
  { name: "sleep", tag: "rnb" }
]

export const ProjectSelector = () => {
  const projectCount = projects.length
  const itemOffset = 400

  const currentIndex = useRef(0)
  const scrollPosition = useRef(0)

  const getTrueScrollPos = (offsetX: number) => {
    return offsetX + scrollPosition.current
  }

  // maps scroll position to itemIndex
  const toIndex = (num: number) => {
    const rounded = Math.round(num) * -1

    return Math.max(0, Math.min(rounded, projectCount - 1))
  }
  // works
  const getRelativeOffsetForCurrentIndex = (index: number) => {
    return (index - currentIndex.current) * itemOffset
  }

  const scroll = (offsetX: number, obj?: any) => {
    currentIndex.current = toIndex(getTrueScrollPos(offsetX) / itemOffset)

    api.start((i) => {
      return {
        x: i * itemOffset + getTrueScrollPos(offsetX),
        scale: 1
      }
    })
  }

  const snap = (offsetX: number) => {
    scrollPosition.current = currentIndex.current * itemOffset * -1

    api.start((i) => ({
      x: getRelativeOffsetForCurrentIndex(i),
      scale: 1
    }))
  }

  const [props, api] = useSprings(projectCount, (i) => ({
    x: i * itemOffset,
    scale: 1
  }))

  const scrollScale = 0.4
  const bind = useGesture({
    onDrag: (state) => scroll(state.movement[0], state),
    onDragEnd: (state) => snap(state.movement[0]),
    onWheel: (state) => scroll(state.movement[1] * scrollScale),
    onWheelEnd: (state) => snap(state.movement[1] * scrollScale)
  })

  return (
    <>
      <div className="project-wrapper" {...bind()}>
        {/* {projects.slice(1, 2).map((project) => (
        <a.div className="project" style={{ x }}>
        {project.name}
        </a.div>
        ))} */}
        {props.map(({ x, scale }, i) => (
          <a.div className="project" style={{ x, scale }} key={i}>
            {projects[i].name}
          </a.div>
        ))}
      </div>
    </>
  )
}
