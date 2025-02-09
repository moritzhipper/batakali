import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAudioStore } from "../../state/audioState"
import start from "./../../assets/start.svg"
import "./WelcomePage.css"

export const WelcomePage = () => {
  const { projectList, setProjectEverywhere } = useAudioStore()
  const [searchParams] = useSearchParams()
  const sharedProjectName = searchParams.get("project")
  const [shareMode, setShareMode] = useState(false)

  useEffect(() => {
    const projectExists = projectList.some(
      (project) => project.name === sharedProjectName
    )

    if (sharedProjectName && projectExists) {
      setShareMode(true)
      setProjectEverywhere(sharedProjectName)
    }
  }, [searchParams])

  return (
    <div className="page-wrapper welcome">
      <div className="header">
        <h1 className="big-ducko-print">batakali</h1>
        <p>vibes and tunes</p>
      </div>
      <div className="checkout">
        {shareMode ? (
          <>
            <p>a track was shared with you</p>
            <Link className="cta shared" to="/projects">
              check it out
            </Link>
          </>
        ) : (
          <Link className="cta" to="/projects">
            <img src={start} />
          </Link>
        )}
      </div>
    </div>
  )
}
