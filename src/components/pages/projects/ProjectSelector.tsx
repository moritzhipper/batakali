import { a, useSprings } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useRef } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { Project } from "../../../types"
import { useMediaQuery } from "../../../use-media-hook"
import { PlaySVG } from "../../media-controls/svg/PlaySVG"
import "./ProjectSelector.css"

const projects: Project[] = [
  { name: "born into this", tag: "rnb" },
  { name: "no name", tag: "synthwave" },
  { name: "run", tag: "hardtechno" },
  { name: "water", tag: "boombap" },
  { name: "sleep", tag: "rnb" }
]

export const ProjectSelector = () => {
  const isMobile = useMediaQuery("(max-width: 700px)")

  const projectCount = projects.length
  const itemOffset = isMobile ? 100 : 120

  const currentIndex = useRef(0)
  const currentScrollPos = useRef(0)

  const getTrueScrollPos = (offset: number) => offset + currentScrollPos.current

  // returns percentage of offset between 0 and maxDistance
  const getPercentByDistance = (offset: number, maxDistance: number) =>
    offset / (itemOffset * maxDistance)

  // maps scroll position to itemIndex
  const toIndex = (num: number) => {
    const rounded = Math.round(num) * -1
    return Math.max(0, Math.min(rounded, projectCount - 1))
  }

  // works
  const getRelativeOffsetForCurrentIndex = (index: number) => {
    return (index - currentIndex.current) * itemOffset
  }

  const getStyle = (i: number, offset: number) => {
    let offsetX = i * itemOffset + getTrueScrollPos(offset)
    // prohibit scroll on last list item
    if (
      (currentIndex.current === projectCount - 1 && offset < 0) ||
      (currentIndex.current === 0 && offset > 0)
    ) {
      offsetX = getRelativeOffsetForCurrentIndex(i)
    }

    const hideBody = currentIndex.current > i || currentIndex.current < i - 2
    const hideButtons = currentIndex.current !== i
    return {
      x: offsetX,
      scale: 1 - getPercentByDistance(offsetX, 3),
      rotateZ: getPercentByDistance(offsetX, 3) * 10,
      opacityBody: hideBody ? 0 : 1,
      opacityButtons: hideButtons ? 0 : 1
    }
  }

  const scroll = (offsetX: number) => {
    currentIndex.current = toIndex(getTrueScrollPos(offsetX) / itemOffset)
    api.start((i) => getStyle(i, offsetX))
  }

  const snap = () => {
    currentScrollPos.current = currentIndex.current * itemOffset * -1
    api.start((i) => getStyle(i, 0))
  }

  const [props, api] = useSprings(projectCount, (i) => ({
    ...getStyle(i, 0),
    ...springConfig
  }))

  const scrollScale = 0.4
  const bind = useGesture({
    onDrag: (state) => scroll(state.movement[0]),
    onDragEnd: () => snap(),
    onWheel: (state) => scroll(state.movement[1] * scrollScale),
    onWheelEnd: () => snap()
  })

  return (
    <>
      <div className="project-wrapper" {...bind()}>
        {props.map(({ x, scale, rotateZ, opacityBody, opacityButtons }, i) => (
          <a.div
            className="project"
            style={{
              x,
              scale,
              rotateZ,
              opacity: opacityBody,
              zIndex: projectCount - i
            }}
            key={i}
          >
            <div className="name">{projects[i].name}</div>
            <a.div className="play-button" style={{ opacity: opacityButtons }}>
              <PlaySVG />
            </a.div>
            <div className="tag">{projects[i].tag}</div>
          </a.div>
        ))}
      </div>
    </>
  )
}
