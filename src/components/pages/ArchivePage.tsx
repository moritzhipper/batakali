import { useNavigate } from "react-router-dom"
import { useAudioStore } from "../../state/audioState"
import { Project } from "../../types"
import { DownloadLink } from "../action-buttons/DownloadLink"
import { ShareButton } from "../action-buttons/ShareButton"
import "./ArchivePage.css"

type ProjectsByTag = {
  tag: string
  projectList: Project[]
}

export const ArchivPage = () => {
  const { projectList, focusProject } = useAudioStore()
  const projectsByTag = sortIntoTagBuckets(projectList)
  const navigate = useNavigate()

  const openProject = (name: string) => {
    focusProject(name)
    navigate(`/projects`)
  }

  return (
    <div className="page-wrapper archive">
      <h1 className="sticky">Archive</h1>
      <div className="grid-wrapper">
        {projectsByTag.map(({ tag, projectList }) => (
          <div className="section-wrapper" key={tag}>
            <h2>{tag}</h2>
            <div className="projects-wrapper">
              {projectList.map((project) => (
                <div key={project.name} className="project-wrapper">
                  <button
                    className="name"
                    onClick={() => openProject(project.name)}
                  >
                    {project.name}
                  </button>
                  <ShareButton projectName={project.name} />
                  <DownloadLink filePath={project.fileName} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const sortIntoTagBuckets = (projectList: Project[]): ProjectsByTag[] => {
  const tags = projectList.map((p) => p.tag)
  const uniqueTags = Array.from(new Set(tags)).sort()

  return uniqueTags.map((tag) => ({
    tag,
    projectList: projectList.filter((p) => p.tag === tag).sort(nameComp)
  }))
}

const nameComp = (a: Project, b: Project) => a.name.localeCompare(b.name)
