import "./MediaControls.css"
import { PlaySVG } from "./svg/PlaySVG"
import { RepeatSVG } from "./svg/RepeatSVG"
export const MediaControls = () => {
  return (
    <div className="media-controls-wrapper">
      <PlaySVG />
      <span>born into this</span>
      <RepeatSVG />
    </div>
  )
}
