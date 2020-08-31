import React from "react"
import styled from "styled-components"

const Modal = ({ visible }) => {
  if (!visible) {
    return null
  }
  return <StyledModalDiv />
}

const StyledModalDiv = styled.div`
  position: fixed;
  height: 100%;
  width: 100vw;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
`
export default Modal
