type Props = {
  type: string
  size?: "s" | "m" | "l"
  className?: string
}

export const Icon = ({ type, size = "m", className = "" }: Props) => {
  const sizes = {
    s: 16,
    m: 24,
    l: 32
  }

  return (
    <button
      className={`ri-${type} ${className}`}
      style={{ fontSize: sizes[size] }}
    />
  )
}
