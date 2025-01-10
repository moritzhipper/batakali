import { a, easings, useSpring } from "@react-spring/web"
import { useAudioStore } from "../../../state/audioState"
import { DownloadLink } from "../../action-buttons/DownloadLink"
import { LoopButton } from "../../action-buttons/LoopButton"
import { PlayPauseButton } from "../../action-buttons/PlayPauseButton"
import "./MediaControls.css"

type Props = {
  onHide: () => void
}

export const MediaControls = ({ onHide }: Props) => {
  const {
    isPlaying,
    isLooping,
    selectedProject,
    togglePlay,
    toggleLoop,
    skip,
    selectNext,
    selectPrevious
  } = useAudioStore()

  const transition = {
    from: { opacity: 0, filter: "blur(10px)", scale: 1.1 },
    to: { opacity: 1, filter: "blur(0px)", scale: 1 },
    config: {
      duration: 400,
      easing: easings.linear
    }
  }

  const next = () => {
    selectNext()
    api.start(transition)
  }

  const previous = () => {
    selectPrevious()
    api.start(transition)
  }

  const [props, api] = useSpring(transition, [])

  return (
    <div className="media-controls-wrapper">
      <a.div style={{ ...props }} className="now-playing">
        <h1>{selectedProject.name}</h1>
      </a.div>
      <div className="controls">
        <DownloadLink filePath={selectedProject.fileName} className="ri-s" />
        <button className="ri-replay-10-line" onClick={() => skip(-10)} />
        <button className="ri-skip-back-fill skip" onClick={previous} />
        <PlayPauseButton
          isPlaying={isPlaying}
          onClick={togglePlay}
          className="play"
        />
        <button className="ri-skip-forward-fill skip" onClick={next} />
        <button className="ri-forward-10-line " onClick={() => skip(10)} />
        <LoopButton
          isLooping={isLooping}
          onClick={toggleLoop}
          className="ri-s"
        />
      </div>
      <button className="hide ri-arrow-up-wide-line" onClick={onHide} />
    </div>
  )
}
