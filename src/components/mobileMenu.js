import React from "react"
import styled from "styled-components"
import { gsap } from "gsap/all"
import { Link } from "gatsby"

const MobileMenu = ({ isOpen }) => {
  React.useEffect(() => {
    if (isOpen) {
      gsap.set(".styledLink", { opacity: 0, y: 0 })
      gsap.to(".styledLink", {
        y: 15,
        delay: 0.15,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: "expo.out",
      })
    }
  }, [isOpen])

  return (
    <MobileNavWrapper isOpen={isOpen}>
      <MobileNav>
        <StyledLink className="styledLink" to="/">
          Forsíða
        </StyledLink>
        <StyledLink className="styledLink" to="/news">
          Fréttir
        </StyledLink>
        <StyledLink className="styledLink" to="/projects">
          Verk
        </StyledLink>
        <StyledLink className="styledLink" to="/about">
          Stofan
        </StyledLink>
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
  opacity: 0;
`

export default MobileMenu
