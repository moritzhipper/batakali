import { useCallback, useEffect } from "react"
import { useAudioStore } from "../state/audioState"

/**
 * This component listens to current mediaState and
 * interacts with the HTML audio element accordingly
 *
 * @returns null
 */
export const AudioPlayer = () => {
  const { isPlaying, isLooping, selectedProject, audio, selectNext } =
    useAudioStore()

  audio.onended = useCallback(() => {
    if (!isLooping) selectNext()
  }, [])

  useEffect(() => {
    audio.pause()
    audio.src = `projects/${selectedProject.fileName}`
    audio.load()

    if (isPlaying) audio.play()
  }, [selectedProject])

  useEffect(() => {
    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    audio.loop = isLooping
  }, [isLooping])

  useEffect(() => {
    audio.currentTime = 0
  }, [selectedProject])

  return null
}
