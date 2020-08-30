import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const MobileMenu = ({ isOpen }) => {
  return (
    <MobileNavWrapper isOpen={isOpen}>
      <nav>
        <Link to="/news/">Fréttir</Link>
        <p>Verk</p>
        <Link to="/about">Stofan</Link>
      </nav>
    </MobileNavWrapper>
  )
}

const MobileNavWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40vw;
  background: blue;
  color: white;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0%)" : "translate(100%)")};
  transition: all 0.3s ease-in;
`

export default MobileMenu
