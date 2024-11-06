type Props = {
  type: string
  size?: "s" | "m" | "l"
}

export const Icon = ({ type, size = "m" }: Props) => {
  const sizes = {
    s: 16,
    m: 24,
    l: 32
  }

  return <span className={`ri-${type}`} style={{ fontSize: sizes[size] }} />
}
