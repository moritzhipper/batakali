import { useMediaStore } from "../../state/porject-media-store"
import { MediaControls } from "../media-controls/MediaControls"
import "./DuckoPage.css"

export const DuckoPage = () => {
  const { selectedProject } = useMediaStore()

  return (
    <div className="page-wrapper ducko">
      <h1>{selectedProject?.name || "Ducko"}</h1>

      <MediaControls />
    </div>
  )
}
