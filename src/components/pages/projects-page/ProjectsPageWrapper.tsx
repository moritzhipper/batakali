import { a, useSpring, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import { springConfig } from "../../../duckoSzeneConfig"
import { useSzeneState } from "../../../state/szeneState"
import { MediaControls } from "./MediaControls"
import "./ProjectsPageWrapper.css"
import { ProjectsViewMobile } from "./ProjectsViewMobile"

export const ProjectsPage = () => {
  const [playerVisible, setPlayerVisible] = useState(false)
  const togglePlayer = () => setPlayerVisible((show) => !show)
  const { setActiveSzene } = useSzeneState()

  useEffect(() => {
    if (playerVisible) {
      setActiveSzene("duck")
    } else {
      setActiveSzene("/projects")
    }
  }, [playerVisible])

  const transitionPlayer = useTransition(playerVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    ...springConfig
  })

  const { translateY } = useSpring({
    translateY: playerVisible ? "0%" : "-25%",
    ...springConfig
  })

  return (
    <div className="page-wrapper projects">
      <a.div className="swipe-wrapper" style={{ translateY }}>
        {transitionPlayer((style, show) =>
          show ? (
            <a.div className="controls-wrapper" style={{ ...style }}>
              <MediaControls onHide={togglePlayer} />
            </a.div>
          ) : (
            <a.div className="projects-wrapper" style={{ ...style }}>
              <ProjectsViewMobile onHide={togglePlayer} />
            </a.div>
          )
        )}
      </a.div>
    </div>
  )
}
