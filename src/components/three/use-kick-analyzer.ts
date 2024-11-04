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
  const loudnessThreshold = 110
  const fftSize = 128
  const frequencyBandFocus = 20

  const normalizeLoudness = (loudness: number) => {
    return (loudness - loudnessThreshold) / (255 - loudnessThreshold)
  }

  useEffect(() => {
    // initialize audio
    if (!selectedProject) return
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
      // wenn schwelle erreicht, set ausführen
      if (dataArray[frequencyBandFocus] > loudnessThreshold) {
        setAudioData(normalizeLoudness(dataArray[frequencyBandFocus]))
        // console.log(normalizeLoudness(dataArray[frequencyBandFocus]))
      }
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
