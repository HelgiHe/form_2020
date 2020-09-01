import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Modal from "./modal"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const setModalVisibility = visibility => {
    setModalVisible(visibility)
  }
  return (
    <>
      <Modal visible={modalVisible} />
      <Header
        setModalVisibility={setModalVisibility}
        siteTitle={data.site.siteMetadata.title}
      />
      <PageContainer>
        <main>{children}</main>
        <StyledFooter>
          <span>Form ráðgjöf</span>
          <span>Kaupangi</span>
          <span>600 Akureyri</span>
          <span>462 6099</span>
          <a href="mailto: formradgjof@formradgjof.is">
            formradgjof@formradgjof.is
          </a>
        </StyledFooter>
      </PageContainer>
    </>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  min-height: calc(100vh - 80px); ;
`
const StyledFooter = styled.footer`
  margin-top: auto;
  background: var(--bone-white);
  display: flex;
  flex-direction: column;
  height: 200px;
  align-items: center;
  font-size: 1.1em;
  justify-content: space-around;
  z-index: -2;
  @media (min-width: 768px) {
    height: 80px;
    flex-direction: row;
  }
`

export default Layout
