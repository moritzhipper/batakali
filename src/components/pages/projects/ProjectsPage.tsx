import { a, useSpring, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { useMediaStore } from "../../../porject-media-store"
import { MediaControls } from "../../media-controls/MediaControls"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"
import { TagSelector } from "./TagSelector"

export const ProjectsPage = () => {
  const [playerVisible, setPlayerVisible] = useState(false)

  const togglePlayer = () => setPlayerVisible((show) => !show)

  const transitionPlayer = useTransition(playerVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    ...springConfig
  })

  const { translateY } = useSpring({
    translateY: playerVisible ? "50%" : "0%",
    ...springConfig
  })

  return (
    <div className="page-wrapper projects">
      <a.div className="wrap-all" style={{ translateY }}>
        {transitionPlayer((style, show) =>
          show ? (
            <a.div className="controls-wrapper" style={{ ...style }}>
              <MediaControls />
              <button
                className="hide ri-arrow-up-wide-line"
                onClick={togglePlayer}
              />
            </a.div>
          ) : (
            <a.div className="content" style={{ ...style }}>
              <SelectionElements onHide={togglePlayer} />
            </a.div>
          )
        )}
      </a.div>
    </div>
  )
}

type SelectionElementsProps = {
  onHide: () => void
}

export const SelectionElements = ({ onHide }: SelectionElementsProps) => {
  const [showFilter, setShowFilter] = useState(false)
  const { selectedTag } = useMediaStore()
  const toggleFilter = () => setShowFilter((show) => !show)

  useEffect(() => {
    setShowFilter(false)
  }, [selectedTag])

  const filterStyle = {
    opacity: 0,
    translateY: 40
  }

  const transitionFilter = useTransition(showFilter, {
    initial: {
      opacity: 1,
      translateY: 0
    },
    from: filterStyle,
    enter: {
      opacity: 1,
      translateY: 0
    },
    leave: filterStyle,
    ...springConfig
  })

  return (
    <>
      <h1>
        <span>Projects</span>
        <button className="hide" onClick={onHide}>
          <span className="ri-play-large-fill" />
          <span className="ri-pause-large-line" />
        </button>
        <button
          className={"filter ri-filter-2-fill " + (showFilter ? "active" : "")}
          onClick={toggleFilter}
        />
      </h1>
      <div className="selector-wrapper">
        {transitionFilter((style, show) => (
          <a.div className="project-selector" style={{ ...style }}>
            {show ? <TagSelector /> : <ProjectReel />}
          </a.div>
        ))}
      </div>
    </>
  )
}
