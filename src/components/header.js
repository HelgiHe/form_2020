import Link from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import React from "react"
import styled from "styled-components"
import gsap from "gsap"
import logo from "../images/formlogo.svg"
import MobileNav from "./mobileMenu"

const Header = ({ setModalVisibility, siteTitle }) => {
  const ref = React.useRef(null)
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handleClickOutside = event => {
      if (event.target instanceof HTMLAnchorElement) return
      if (!ref.current.contains(event.target)) {
        setOpen(prevState => (prevState ? !prevState : prevState))
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    setModalVisibility(isOpen)
  }, [isOpen])

  const animateUnderlineIn = event => {
    const underLine = event.target.querySelector("span")
    gsap.set(underLine, { xPercent: 0 })
    gsap.to(underLine, { xPercent: 100, duration: 0.3, ease: "power2.out" })
  }

  const animateUnderlineOut = event => {
    const underLine = event.target.querySelector("span")
    gsap.to(underLine, { xPercent: 200, duration: 0.3, ease: "power2.in" })
  }
  return (
    <StyledHeader>
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <StyledNav>
        <StyledLink
          cover
          bg="#c9d6df"
          direction="right"
          to="/news/"
          data-testid="news_nav"
          onMouseEnter={e => animateUnderlineIn(e)}
          onMouseOut={e => animateUnderlineOut(e)}
        >
          Fréttir
          <UnderLine className="underline" />
        </StyledLink>
        <StyledLink
          cover
          bg="#c9d6df"
          direction="right"
          data-testid="project_nav"
          to="/projects"
          onMouseEnter={e => animateUnderlineIn(e)}
          onMouseOut={e => animateUnderlineOut(e)}
        >
          Verk
          <UnderLine className="underline" />
        </StyledLink>
        <StyledLink
          cover
          bg="#c9d6df"
          direction="right"
          data-testid="about_nav"
          to="/about"
          onMouseEnter={e => animateUnderlineIn(e)}
          onMouseOut={e => animateUnderlineOut(e)}
        >
          Stofan
          <UnderLine className="underline" />
        </StyledLink>
      </StyledNav>
      <NavButton
        name="navigation"
        onClick={() => setOpen(state => !state)}
        ref={ref}
      >
        <svg height="30" width="40">
          <FirstLine x1="10" y1="4" x2="40" y2="4" isOpen={isOpen} />
          <SecondLine x1="8" y1="14" x2="35" y2="14" isOpen={isOpen} />
          <ThirdLine x1="12" y1="24" x2="40" y2="24" isOpen={isOpen} />
        </svg>
      </NavButton>
      <MobileNav isOpen={isOpen} />
    </StyledHeader>
  )
}

const NavButton = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 5;
  background: none;
  border: none;
  &:active {
    outline: none;
  }
  @media (min-width: 768px) {
    display: none;
  }
`

const Line = styled.line`
  stroke: ${({ isOpen }) => (isOpen ? "#fff" : "#000")};
  stroke-width: 3px;
  background: none;
  border: none;
`

const FirstLine = styled(Line)`
  transform: ${({ isOpen }) =>
    !isOpen ? "" : "rotate(45deg) translate(1px, -8px)"};
  transition: all 0.2s cubic-bezier(0.69, 0.39, 0.73, 1.02);
`

const SecondLine = styled(Line)`
  transform: ${({ isOpen }) => (!isOpen ? "" : "translate(-30px, 0px)")};
  opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
  transition: opacity 0.2s cubic-bezier(0.29, 0.85, 0.6, 1);
  transition: transform 0.23s cubic-bezier(0.69, 0.39, 0.73, 1.02);
`

const ThirdLine = styled(Line)`
  transform: ${({ isOpen }) =>
    !isOpen ? "" : "rotate(-45deg) translate(-22px,1px)"};
  transition: all 0.2s cubic-bezier(0.69, 0.39, 0.73, 1.02);
`

const StyledHeader = styled.header`
  background: var(--bone-white);
  padding 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 60px;
`

const StyledNav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 300px;
    font-family: Gilroy-Medium;
    font-size: 1.3em;
  }
`

const Logo = styled.img`
  width: 116px;
`

const StyledLink = styled(AniLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const UnderLine = styled.span`
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  right: 100%;
  background-color: var(--darkGrey);
`

export default Header
