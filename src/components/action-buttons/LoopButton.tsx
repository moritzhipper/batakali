import { HTMLAttributes } from "react"

type Props = {
  isLooping: boolean
} & HTMLAttributes<HTMLButtonElement>
export const LoopButton = ({ isLooping, className, ...props }: Props) => {
  const loopActiveClass = isLooping ? "ri-repeat-one-line" : "ri-repeat-2-line"
  const classes = `${loopActiveClass} ${className || ""}`

  return <button className={classes} {...props} />
}
