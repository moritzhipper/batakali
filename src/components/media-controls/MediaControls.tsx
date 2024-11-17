import { useAudioStore } from "../../state/audioState"
import "./MediaControls.css"
export const MediaControls = () => {
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

  const classPlay = `${
    isPlaying ? "ri-pause-large-line" : "ri-play-large-fill"
  } ri-l`

  const classRepeat = `${
    isLooping ? "ri-repeat-one-line" : "ri-repeat-2-line"
  } ri-s`

  return (
    <div className="media-controls-wrapper">
      <a
        className="ri-download-line ri-s"
        href={selectedProject.fileName}
        download
      />
      <button className="ri-skip-back-line" onClick={selectPrevious} />
      <button className="ri-replay-10-line" onClick={() => skip(-10)} />
      <button className={classPlay} onClick={togglePlay} />
      <button className="ri-forward-10-line" onClick={() => skip(10)} />
      <button className="ri-skip-forward-line" onClick={selectNext} />
      <button className={classRepeat} onClick={toggleLoop} />
    </div>
  )
}
