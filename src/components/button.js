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
  height: 40px;
  padding: 8px;
  min-width: 108px;
  margin: 12px 24px 24px 24px;
  font-size: 0.9em;
  transition: all 200ms ease-out;
  border: #000 2px solid;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--darkblue)" : "var(--bone-white)"};
  color: ${({ isSelected }) => (isSelected ? "var(--bone-white)" : "#000")};
  &:hover {
    border: var(--darkblue) 2px solid;
    background-color: var(--darkblue);
    color: var(--bone-white);
  }
`

export default Button
