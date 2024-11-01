
import { a, useSprings } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useRef } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { projectList } from "../../../project-list"
import { useMediaQuery } from "../../../use-media-hook"
import { PlaySVG } from "../../media-controls/svg/PlaySVG"
import "./ProjectSelector.css"

export const ProjectSelector = () => {
  const isMobile = useMediaQuery("(max-width: 700px)")
  const projectCount = projectList.length
  const itemOffset = isMobile ? 40 : 80
  const dragScale = isMobile ? 0.4 : 1
  const wheelScale = 0.2

  const currentIndex = useRef(0)
  const currentScrollPos = useRef(0)
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
      pointerEvents
    }
  }

  const scroll = (offset: number) => {
    currentIndex.current = toIndex(getTrueScrollPos(offset) / itemOffset)
    api.start((i) => getStyle(i, offset))
  }

  const snap = () => {
    currentScrollPos.current = currentIndex.current * itemOffset * -1
    api.start((i) => getStyle(i, 0))
  }

  const focusCard = (i: number) => {
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

  return (
    <>
      <div className="project-wrapper" {...bind()}>
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
                <div className="name">{projectList[i].name}</div>
                <button>
                  <PlaySVG />
                </button>
                <div className="tag">{projectList[i].tag}</div>
              </a.div>
            </a.div>
          )
        )}
      </div>
    </>
  )
}
