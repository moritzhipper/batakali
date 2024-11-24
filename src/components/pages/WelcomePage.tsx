import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAudioStore } from "../../state/audioState"
import "./WelcomePage.css"

export const WelcomePage = () => {
  const { projectList, selectProject, selectTag, selectedProject } =
    useAudioStore()
  const [searchParams] = useSearchParams()
  const sharedProjectName = searchParams.get("project")
  const [shareMode, setShareMode] = useState(false)

  useEffect(() => {
    const projectExists = projectList.some(
      (project) => project.name === sharedProjectName
    )

    if (sharedProjectName && projectExists) {
      setShareMode(true)
      selectProject(sharedProjectName)
      selectTag(selectedProject.tag)
    }
  }, [searchParams])

  return (
    <div className="page-wrapper welcome">
      <div className="header">
        <h1>Angry Ducko</h1>
        <p className="normal"> vibes and tunes</p>
      </div>
      {shareMode ? (
        <Link className="shared" to="/projects">
          <p className="normal">a track was shared with you</p>
          <p className="cta">check it out</p>
        </Link>
      ) : (
        <Link className="default" to="/projects">
          check out projects
        </Link>
      )}
    </div>
  )
}
