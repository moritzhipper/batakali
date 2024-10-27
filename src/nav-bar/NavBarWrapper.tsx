import { useLocation } from "react-router-dom"
import { useMediaQuery } from "../mediaQueryHook"
import { NavBarDesktop } from "./NavBarDesktop"
import { NavBarMobile } from "./NavBarMobile"

export const NavBarWrapper = () => {
  const isMobile = useMediaQuery("(max-width: 700px)")
  const isOnWelcomePage = useLocation().pathname === "/"

  if (isOnWelcomePage) {
    return <></>
  }

  if (isMobile) {
    return <NavBarMobile />
  }
  return <NavBarDesktop />
}
