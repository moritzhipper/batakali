import { useEffect, useRef, useState } from "react"
import { useMediaStore } from "../../porject-media-store"

export const useAudioImpactAnalyzer = () => {
  const [audioData, setAudioData] = useState(0)
  const audioContextRef = useRef<AudioContext>()
  const analyzerRef = useRef<AnalyserNode>()
  const sourceRef = useRef<MediaElementAudioSourceNode>()
  const animationFrameIdRef = useRef<number>()

  const { selectedProject } = useMediaStore()

  // hook outputs, when loudness exceeds this threshold
  const fftSize = 32

  const getLoudness = (bands: Uint8Array) =>
    bands.reduce((sum, value) => sum + value, 0) / bands.length / 255

  useEffect(() => {
    // initialize audio
    if (!selectedProject || !selectedProject.fileName) return
    const audio = new Audio(selectedProject.fileName)
    audioContextRef.current = new AudioContext()
    analyzerRef.current = audioContextRef.current.createAnalyser()
    sourceRef.current = audioContextRef.current.createMediaElementSource(audio)
    sourceRef.current.connect(analyzerRef.current)

    // configure analyzer
    analyzerRef.current.fftSize = fftSize
    analyzerRef.current.connect(audioContextRef.current.destination)

    const bufferLength = analyzerRef.current.frequencyBinCount
    let dataArray = new Uint8Array(bufferLength)

    // compute audio impact
    const tick = () => {
      analyzerRef.current?.getByteFrequencyData(dataArray)
      setAudioData(getLoudness(dataArray))
      animationFrameIdRef.current = requestAnimationFrame(tick)
    }

    audio.play()

    tick()

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current!)
      audio.pause()
      audioContextRef.current?.close()
    }
  }, [selectedProject])

  return audioData
}
