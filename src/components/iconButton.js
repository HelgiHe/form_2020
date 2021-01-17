import React from "react"
import styled from "styled-components"

const IconButton = ({ onClick, isSelected, className, children }) => {
  return (
    <StyledIconButton
      className={`icon-button ${className}`}
      isSelected={isSelected}
      onClick={onClick}
    >
      {children}
    </StyledIconButton>
  )
}

const StyledIconButton = styled.button`
  padding: 8px;
  margin: 4px;
  font-size: 0.9em;
  transition: all 200ms ease-out;
  border: none;
  border-radius: 26px;
  display: flex;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--bone-white)" : "var(--white)"};
  color: var(--text);
  &:hover {
    background-color: var(--bone-white);
  }
`

export default IconButton
