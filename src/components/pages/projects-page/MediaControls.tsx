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

  return (
    <div className="media-controls-wrapper">
      <div className="now-playing">
        <h1>{selectedProject.name}</h1>
        <span className="text-shadow">{selectedProject.tag}</span>
      </div>
      <div className="controls">
        <DownloadLink filePath={selectedProject.fileName} className="ri-s" />
        <button className="ri-skip-back-line" onClick={selectPrevious} />
        <button className="ri-replay-10-line" onClick={() => skip(-10)} />
        <PlayPauseButton
          isPlaying={isPlaying}
          onClick={togglePlay}
          className="ri-l play"
        />
        <button className="ri-forward-10-line" onClick={() => skip(10)} />
        <button className="ri-skip-forward-line" onClick={selectNext} />
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
