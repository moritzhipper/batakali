import { useAduioStore } from "../../state/audioState"
import { Project } from "../../types"
import "./ArchivePage.css"

type ProjectsByTag = {
  tag: string
  projectList: Project[]
}

export const ArchivPage = () => {
  const { projectList } = useAduioStore()
  const projectsByTag = sortIntoTagBuckets(projectList)

  return (
    <div className="page-wrapper archive">
      <h1>Archive</h1>
      <div className="grid-wrapper">
        {projectsByTag.map(({ tag, projectList }) => (
          <div className="section-wrapper" key={tag}>
            <h2>{tag}</h2>
            <div className="projects-wrapper">
              {projectList.map((project) => (
                <div key={project.name} className="project-wrapper">
                  <p className="name">{project.name}</p>
                  <button className="ri-share-fill ri-m" />
                  <button className="ri-download-fill ri-m" />
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
  const uniqueTags = Array.from(new Set(tags))

  return uniqueTags.map((tag) => ({
    tag,
    projectList: projectList.filter((p) => p.tag === tag)
  }))
}
