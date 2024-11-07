import { useMediaStore } from "../../porject-media-store"
import "./MediaControls.css"
export const MediaControls = () => {
  const { isPlaying, isRepeating, togglePlay, toggleRepeat } = useMediaStore()

  const classPlay = `${
    isPlaying ? "ri-pause-large-line ri-l" : "ri-play-large-fill"
  } ri-l`

  const classRepeat = `${
    isRepeating ? "ri-repeat-2-line ri-s" : "ri-repeat-one-line ri-s"
  } ri-s`

  return (
    <div className="media-controls-wrapper">
      <button className="ri-download-line ri-s" />
      <button className="ri-skip-back-line" />
      <button className="ri-replay-10-line" />
      <button className={classPlay} onClick={togglePlay} />
      <button className="ri-forward-10-line" />
      <button className="ri-skip-forward-line" />
      <button className={classRepeat} onClick={toggleRepeat} />
    </div>
  )
}
