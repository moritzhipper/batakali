import { DepthOfField, EffectComposer } from "@react-three/postprocessing"

export const Dof = () => {
  return (
    <EffectComposer>
      <DepthOfField
        target={[0, 0, 1]}
        focusRange={0.11}
        focalLength={5}
        bokehScale={12}
      />
    </EffectComposer>
  )
}
