import { HTMLAttributes } from "react"

type Props = {
  isPlaying: boolean
} & HTMLAttributes<HTMLButtonElement>
export const PlayPauseButton = ({ isPlaying, className, ...props }: Props) => {
  const playPauseClass = isPlaying
    ? "ri-pause-large-line"
    : "ri-play-large-fill"
  const classes = `${playPauseClass} ${className || ""}`

  return <button className={classes} {...props} />
}
