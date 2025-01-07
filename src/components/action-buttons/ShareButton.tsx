import { HTMLAttributes, useState } from "react"
import "./ShareButton.css"

type Props = {
  projectName: string
} & HTMLAttributes<HTMLButtonElement>
export const ShareButton = ({ projectName, className, ...props }: Props) => {
  const classes = `ri-share-line share-button ${className || ""}`
  const shareUrl = new URL(window.location.origin)
  shareUrl.searchParams.set("project", projectName)

  let [showCopiedToCLipboard, setShowCopiedToCLipboard] = useState(false)

  const showCopiedSuccess = () => {
    setShowCopiedToCLipboard(true)
    setTimeout(() => {
      setShowCopiedToCLipboard(false)
    }, 3000)
  }

  const share = () => {
    if (navigator.share && navigator.canShare()) {
      navigator.share({ url: shareUrl.toString() })
    } else {
      navigator.clipboard.writeText(shareUrl.toString()).then(() => {
        showCopiedSuccess()
      })
    }
  }

  return (
    <div className="share-button-wrapper">
      {showCopiedToCLipboard && (
        <div className="copied-to-clipboard">copied to clipboard</div>
      )}
      <button onClick={share} className={classes} {...props} />
    </div>
  )
}
