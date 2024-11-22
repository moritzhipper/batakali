import { HTMLAttributes } from "react"

type Props = {
  filePath: string
} & HTMLAttributes<HTMLAnchorElement>
export const DownloadLink = ({ filePath, className, ...props }: Props) => {
  const classes = `ri-download-line ${className || ""}`

  return <a href={filePath} download className={classes} {...props} />
}
