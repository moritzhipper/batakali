import { useEffect, useRef, useState } from "react"
import { useMediaStore } from "../../state/porject-media-store"

/**
 * Listens to mediastate and plays and computes the loudness of the current audio file
 *
 * @returns loudness of the current audio file normalized to 0-1
 */
export const useAudioGainAnalyzer = () => {
  const [audioLoudness, setAudioLoudness] = useState(0)
  const audioContextRef = useRef<AudioContext>()
  const analyzerRef = useRef<AnalyserNode>()
  const sourceRef = useRef<MediaElementAudioSourceNode>()
  const animationFrameIdRef = useRef<number>()
  const bufferLengthRef = useRef<number>()
  const dataArrayRef = useRef<Uint8Array>()
  const [isAudioContextInitialized, setAudioContextInitialized] =
    useState(false)

  const { isPlaying, audio } = useMediaStore()

  // computes audio gain from current animationFrames bands and normalizes them to 0-1
  const getLoudness = (bands: Uint8Array) =>
    bands.reduce((sum, value) => sum + value, 0) / bands.length / 255

  const loadAnimationFrame = () => {
    console.log("ticking")
    analyzerRef.current!.getByteFrequencyData(dataArrayRef.current!)
    setAudioLoudness(getLoudness(dataArrayRef.current!))
    animationFrameIdRef.current = requestAnimationFrame(loadAnimationFrame)
  }

  const setupAdudioContext = () => {
    audioContextRef.current = new AudioContext()
    analyzerRef.current = audioContextRef.current.createAnalyser()
    analyzerRef.current.fftSize = 32
    bufferLengthRef.current = analyzerRef.current.frequencyBinCount
    dataArrayRef.current = new Uint8Array(bufferLengthRef.current)
    sourceRef.current = audioContextRef.current.createMediaElementSource(audio)
    sourceRef.current.connect(analyzerRef.current)
    analyzerRef.current.connect(audioContextRef.current.destination)
    setAudioContextInitialized(true)
    console.log("audio context initialized")
  }

  useEffect(() => {
    // do only once. Do after userinteraction to accomondate browsers security policies
    if (!isAudioContextInitialized && isPlaying) {
      console.log("audio context initialized")
      setupAdudioContext()
    }
    if (isPlaying) {
      loadAnimationFrame()
    } else {
      cancelAnimationFrame(animationFrameIdRef.current!)
      setAudioLoudness(0)
    }
  }, [isPlaying])

  return audioLoudness
}
