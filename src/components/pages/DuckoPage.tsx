import { a, useSpring } from "@react-spring/web"
import { useState } from "react"
import { useMediaStore } from "../../porject-media-store"
import { MediaControls } from "../media-controls/MediaControls"
import "./DuckoPage.css"
import { ProjectReel } from "./projects/ProjectReel"

export const DuckoPage = () => {
  const { selectedProject } = useMediaStore()
  const [showProjects, setShowProjects] = useState(false)
  const toggleProjects = () => setShowProjects(!showProjects)

  const filterStyle = {
    opacity: 1,
    height: 0
  }

  const style = useSpring({
    opacity: showProjects ? 1 : 0,
    height: showProjects ? "50%" : "0%"
  })

  return (
    <div className="page-wrapper ducko">
      {/* <h1>{selectedProject?.name || "Ducko"}</h1> */}

      <div className="buttons">
        {!showProjects && <MediaControls />}
        <button className="show-projects" onClick={toggleProjects}>
          <span className="ri-arrow-right-wide-line" />
        </button>
      </div>
      <a.div className="bottom" style={{ ...style }}>
        <div className="reels-wrapper">
          <ProjectReel />
        </div>
      </a.div>
    </div>
  )
}
