import { useMediaStore } from "../../state/porject-media-store"
import "./MediaControls.css"
export const MediaControls = () => {
  const { isPlaying, isLooping, togglePlay, toggleLoop, skip, skipProject } =
    useMediaStore()

  const classPlay = `${
    isPlaying ? "ri-pause-large-line" : "ri-play-large-fill"
  } ri-l`

  const classRepeat = `${
    isLooping ? "ri-repeat-one-line" : "ri-repeat-2-line"
  } ri-s`

  return (
    <div className="media-controls-wrapper">
      <button className="ri-download-line ri-s" />
      <button
        className="ri-skip-back-line"
        onClick={() => skipProject(false)}
      />
      <button className="ri-replay-10-line" onClick={() => skip(-10)} />
      <button className={classPlay} onClick={togglePlay} />
      <button className="ri-forward-10-line" onClick={() => skip(10)} />
      <button
        className="ri-skip-forward-line"
        onClick={() => skipProject(true)}
      />
      <button className={classRepeat} onClick={toggleLoop} />
    </div>
  )
}
