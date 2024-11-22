import { HTMLAttributes } from "react"

type Props = {
  projectName: string
} & HTMLAttributes<HTMLButtonElement>
export const ShareButton = ({ projectName, className, ...props }: Props) => {
  const classes = `ri-share-line ${className || ""}`
  const shareUrl = new URL(window.location.href)
  shareUrl.searchParams.set("project", projectName)

  const share = () => {
    if (navigator.share && navigator.canShare()) {
      navigator.share({ url: shareUrl.toString() })
    } else {
      navigator.clipboard.writeText(shareUrl.toString())
    }
  }

  return <button onClick={share} className={classes} {...props} />
}
