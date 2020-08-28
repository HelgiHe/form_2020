import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import logo from "../images/formlogo.svg"

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <Link to="/">
      <StyledImage src={logo} alt="logo" />
    </Link>
    <StyledNav>
      <p>Fréttir</p>
      <p>Verk</p>
      <Link to="/about">Stofan</Link>
    </StyledNav>
  </StyledHeader>
)

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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 300px;
  font-family: Gilroy-Medium;
  font-size: 1.3em;
`

const StyledImage = styled.img`
  width: 116px;
`

export default Header
