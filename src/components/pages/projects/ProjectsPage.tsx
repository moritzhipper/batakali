import { a, useSpring, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import { springConfig } from "../../../angry-ducko-config"
import { useMediaStore } from "../../../porject-media-store"
import { MediaControls } from "../../media-controls/MediaControls"
import { ProjectReel } from "./ProjectReel"
import "./ProjectsPage.css"
import { TagSelector } from "./TagSelector"

export const ProjectsPage = () => {
  const [showPlayer, setShowPlayer] = useState(true)

  const togglePlayer = () => setShowPlayer((show) => !show)

  useEffect(() => {
    setShowPlayer(false)
  }, [])

  const playerStyle = {
    opacity: 0
  }

  const transitionPlayer = useTransition(showPlayer, {
    from: playerStyle,
    enter: {
      opacity: 1
    },
    leave: playerStyle,
    ...springConfig
  })

  const { translateY } = useSpring({
    translateY: showPlayer ? "50%" : "0%",
    ...springConfig
  })

  return (
    <div className="page-wrapper projects">
      <a.div className="wrap-all" style={{ translateY }}>
        {transitionPlayer((style, show) =>
          show ? (
            <>
              <button
                className="ri-arrow-up-wide-line"
                onClick={togglePlayer}
              />
              <a.div className="controls-wrapper" style={{ ...style }}>
                <MediaControls />
              </a.div>
            </>
          ) : (
            <a.div className="content" style={{ ...style }}>
              <SelectionElements />
            </a.div>
          )
        )}
      </a.div>
    </div>
  )
}

export const SelectionElements = () => {
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
        Projects
        <button
          className={
            "filter ri-filter-2-fill ri-m " + (showFilter ? "open" : "")
          }
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
