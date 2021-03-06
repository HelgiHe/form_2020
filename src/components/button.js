import React from "react"
import styled from "styled-components"

const Button = ({ onClick, className, isSelected, children }) => {
  return (
    <StyledButton
      className={className}
      isSelected={isSelected}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  padding: 8px;
  min-width: 80px;
  margin: 4px;
  font-size: 0.9em;
  transition: all 200ms ease-out;
  border: none;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--lightGrey)" : "var(--white)"};
  color: var(--text);
  &:hover {
    background-color: var(--bone-white);
  }
`

export default Button
