import { useCallback, useEffect, useRef } from "react"
import { useMediaStore } from "../state/porject-media-store"

export const AudioPlayer = () => {
  const {
    isPlaying,
    isLooping,
    selectedProject,
    audio,
    pause,
    skipProject: selectNextProject
  } = useMediaStore()
  const timeoutRef = useRef()

  audio.onended = useCallback(() => {
    if (!isLooping) {
      pause()
    }
    {
    }
  }, [])

  useEffect(() => {
    audio.pause()
    audio.src = selectedProject.fileName
    audio.load()

    if (isPlaying) {
      audio.play()
    }
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

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [isLooping])

  useEffect(() => {
    audio.currentTime = 0
  }, [selectedProject])

  return null
}
