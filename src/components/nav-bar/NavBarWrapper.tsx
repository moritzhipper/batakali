import { useLocation } from "react-router-dom"
import { useMediaQuery } from "../../useMediaHook"
import { NavBarDesktop } from "./NavBarDesktop"
import { NavBarMobile } from "./NavBarMobile"
import "./NavBarWrapper.css"

export const NavBarWrapper = () => {
  const isMobile = useMediaQuery("(max-width: 700px)")
  const isOnWelcomePage = useLocation().pathname === "/"

  if (isOnWelcomePage) return null
  if (isMobile) return <NavBarMobile />
  return <NavBarDesktop />
}
