import { useSyncExternalStore } from "react"

export const useMediaQuery = (query: string) => {
  const media = window.matchMedia(query)

  return useSyncExternalStore(
    (callback) => {
      media.addEventListener("change", callback)
      return () => {
        media.removeEventListener("change", callback)
      }
    },
    () => media.matches
  )
}
