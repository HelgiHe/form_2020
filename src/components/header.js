import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import logo from "../assets/form_logo.jpg"

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
`

const StyledImage = styled.img`
  width: 100px;
`

export default Header
