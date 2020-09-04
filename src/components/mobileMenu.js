import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const MobileMenu = ({ isOpen }) => {
  return (
    <MobileNavWrapper isOpen={isOpen}>
      <MobileNav>
        <StyledLink to="/news">Fréttir</StyledLink>
        <StyledLink to="/projects">Verk</StyledLink>
        <StyledLink to="/about">Stofan</StyledLink>
      </MobileNav>
    </MobileNavWrapper>
  )
}

const MobileNavWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 80vw;
  background: var(--darkblue);
  color: white;
  display: flex;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0%)" : "translate(100%)")};
  transition: all 0.22s cubic-bezier(0.17, 0.84, 0.87, 0.92);
  font-size: 1.8em;
  z-index: 4;
`

const MobileNav = styled.nav`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: flex-end;
  text-align: right;
  margin-right: 12px;
  z-index: 4;
`

const StyledLink = styled(Link)`
  padding: 12px 0px;
`

export default MobileMenu
