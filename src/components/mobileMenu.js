import React from "react"
import styled from "styled-components"
import { gsap, CustomEase } from "gsap/all"
import { Link } from "gatsby"

const MobileMenu = ({ isOpen }) => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase)
  }

  React.useEffect(() => {
    if (isOpen) {
      CustomEase.create(
        "customBack",
        "M0,0 C0.128,0.572 0.209,0.962 0.464,1.036 0.624,1.082 0.838,1 1,1 "
      )
      gsap.from(".styledLink", {
        y: 40,
        delay: 0.15,
        opacity: 0,
        stagger: 0.1,
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
`

export default MobileMenu
