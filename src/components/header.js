import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import logo from "../images/formlogo.svg"
import MobileNav from "./mobileMenu"

const Header = ({ siteTitle }) => {
  const ref = React.useRef(null)

  const [isOpen, setOpen] = React.useState(false)
  React.useEffect(() => {
    function handleClickOutside(event) {
      console.log(ref.current.contains(event.target))
      if (!ref.current.contains(event.target)) {
        setOpen(prevState => (prevState ? !prevState : prevState))
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })
  return (
    <StyledHeader>
      <Link to="/">
        <StyledImage src={logo} alt="logo" />
      </Link>
      <StyledNav>
        <Link to="/news/">Fréttir</Link>
        <p>Verk</p>
        <Link to="/about">Stofan</Link>
      </StyledNav>
      <NavButton onClick={() => setOpen(state => !state)} ref={ref}>
        <svg height="24" width="24">
          <Line x1="0" y1="6" x2="200" y2="6" />
          <Line x1="0" y1="12" x2="200" y2="12" />
          <Line x1="0" y1="18" x2="200" y2="18" />
        </svg>
      </NavButton>
      <MobileNav isOpen={isOpen} />
    </StyledHeader>
  )
}

const NavButton = styled.button`
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 1;
`

const Line = styled.line`
  stroke: #000;
  stroke-width: 2px;
  margin-bottom: 2px;
`

const StyledHeader = styled.header`
  background: var(--bone-white);
  padding 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const StyledImage = styled.img`
  width: 116px;
`

export default Header
