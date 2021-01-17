import React from "react"
import styled from "styled-components"

const Button = ({ onClick, isSelected, children }) => {
  return (
    <StyledButton isSelected={isSelected} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  padding: 8px;
  min-width: 80px;
  margin: 4px 12px 12px 12px;
  font-size: 0.9em;
  transition: all 200ms ease-out;
  border: none;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--bone-white)" : "var(--white)"};
  color: ${({ isSelected }) => (isSelected ? "var(--bone-white)" : "#000")};
  &:hover {
    background-color: var(--bone-white);
    color: var(--bone-white);
  }
`

export default Button
