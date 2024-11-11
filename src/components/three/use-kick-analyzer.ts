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
  const audioRef = useRef<HTMLAudioElement>()
  const [audioContextIsInitialized, setAudioContextIsInitialized] =
    useState(false)

  const { isPlaying, selectedProject } = useMediaStore()

  // computes audio gain from current audioFrame bands and normalizes them to 0-1
  const getLoudness = (bands: Uint8Array) =>
    bands.reduce((sum, value) => sum + value, 0) / bands.length / 255

  const tick = () => {
    console.log("ticking")
    analyzerRef.current!.getByteFrequencyData(dataArrayRef.current!)
    setAudioLoudness(getLoudness(dataArrayRef.current!))
    animationFrameIdRef.current = requestAnimationFrame(tick)
  }

  const setupAdudioContext = () => {
    audioContextRef.current = new AudioContext()
    analyzerRef.current = audioContextRef.current.createAnalyser()
    analyzerRef.current.fftSize = 32
    bufferLengthRef.current = analyzerRef.current.frequencyBinCount
    dataArrayRef.current = new Uint8Array(bufferLengthRef.current!)
    console.log("audio context initialized")
  }

  const connectToNewAudioRef = () => {
    audioRef.current = new Audio(selectedProject.fileName)
    sourceRef.current = audioContextRef.current!.createMediaElementSource(
      audioRef.current!
    )
    sourceRef.current.connect(analyzerRef.current!)
    analyzerRef.current!.connect(audioContextRef.current!.destination)
    console.log("connected to new audio ref")
  }

  // do only once? -> need to rtewire some deps on prjectchange
  useEffect(() => {
    // setupAdudioContext()
  }, [])

  useEffect(() => {
    if (selectedProject.fileName) {
      connectToNewAudioRef()
    }
    console.log(selectedProject.fileName)
  }, [selectedProject])

  // setup audio only once. reuse on audiochange
  useEffect(() => {
    if (!audioContextIsInitialized) {
      setupAdudioContext()
      setAudioContextIsInitialized(true)
    }
    if (isPlaying) {
      audioRef.current?.play()
      tick()
    } else {
      audioRef.current?.pause()
      cancelAnimationFrame(animationFrameIdRef.current!)
      setAudioLoudness(0)
    }
  }, [isPlaying])

  return audioLoudness
}
