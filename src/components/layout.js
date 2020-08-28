import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <PageContainer>
        <main>{children}</main>
        <StyledFooter>© {new Date().getFullYear()}</StyledFooter>
      </PageContainer>
    </>
  )
}

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
`
const PageContainer = styled.div`
  min-height: 80vh;
`

export default Layout
