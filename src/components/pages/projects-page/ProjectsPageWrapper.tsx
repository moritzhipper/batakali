import { a, useSpring } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useEffect, useRef, useState } from "react"
import { springConfig } from "../../../config/szeneConfig"
import { useSzeneState } from "../../../state/szeneState"
import { MediaControls } from "./MediaControls"
import { ProjectSelectorView } from "./ProjectSelectorView"
import "./ProjectsPageWrapper.css"

export const ProjectsPage = () => {
  const [playerVisible, setPlayerVisible] = useState(false)
  const togglePlayer = () => setPlayerVisible((show) => !show)
  const { setActiveSzene } = useSzeneState()
  const swipeRapperRef = useRef<HTMLDivElement>(null!)

  const positionPerc = useRef(-25)
  const pxToPerc = (px: number) => (px / window.innerHeight) * 100

  const calcStyle = (offset: number) => {
    const offsetPerc = pxToPerc(offset)
    const realPerc = positionPerc.current + offsetPerc

    return {
      translateY: realPerc + "%",
      opacityPlayer: 1 + realPerc / 25
    }
  }

  useEffect(() => {
    if (playerVisible) {
      setActiveSzene("duck")
      positionPerc.current = 0
    } else {
      positionPerc.current = -25
      setActiveSzene("/projects")
    }
    // set to zero to prevent browser from offsetting view by changing this
    swipeRapperRef.current.scrollTop = 0
    api.start(calcStyle(0))
  }, [playerVisible])

  const [{ translateY, opacityPlayer }, api] = useSpring(
    { ...calcStyle(0), ...springConfig },
    []
  )

  const scroll = (offset: number) => {
    // prohibit scroll in out of screen direction
    if (
      offset === 0 ||
      (playerVisible && offset > 0) ||
      (!playerVisible && offset < 0)
    ) {
      return
    }
    api.start(calcStyle(offset))
  }

  const snap = (offset: number) => {
    const isOverThreshold = Math.abs(pxToPerc(offset)) > 15

    if (isOverThreshold) {
      togglePlayer()
    } else {
      api.start(calcStyle(0))
    }
  }

  const bind = useGesture({
    onDrag: ({ movement }) => scroll(movement[1]),
    onDragEnd: ({ movement }) => snap(movement[1])
  })

  const showPlayer = () => setPlayerVisible(true)
  const hidePlayer = () => setPlayerVisible(false)

  const pointerEventsClass = !playerVisible ? " no-pointer-events" : ""

  return (
    <div className="page-wrapper projects" ref={swipeRapperRef}>
      <a.div
        className="swipe-wrapper"
        {...bind()}
        style={{ translateY: translateY }}
      >
        <div className="projects-wrapper" onFocus={hidePlayer}>
          <ProjectSelectorView onHide={togglePlayer} />
        </div>
        <a.div
          className={"controls-wrapper" + pointerEventsClass}
          style={{ opacity: opacityPlayer }}
          onFocus={showPlayer}
        >
          <MediaControls onHide={togglePlayer} />
        </a.div>
      </a.div>
    </div>
  )
}
