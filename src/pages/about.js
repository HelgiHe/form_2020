import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"

import styled from "styled-components"
import Layout from "../components/layout"

export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          allSanityAbout {
            edges {
              node {
                image {
                  asset {
                    url
                    title
                  }
                }
                about {
                  _rawChildren
                }
              }
            }
          }
        }
      `}
      render={({ allSanityAbout }) => {
        return (
          <Layout>
            <SEO title="Stofan" />
            <AboutContainer>
              <StyledHeading>Um Stofuna</StyledHeading>
              <StyledSection>
                <StyledImage
                  src={allSanityAbout.edges[0].node.image.asset.url}
                />
                <span>
                  {allSanityAbout.edges[0].node.about.map(
                    ({ _rawChildren }) => (
                      <StyledParagraph>{_rawChildren[0].text}</StyledParagraph>
                    )
                  )}
                </span>
              </StyledSection>
            </AboutContainer>
          </Layout>
        )
      }}
    />
  )
}

const AboutContainer = styled.div`
  padding: 0px 25px;
`

const StyledHeading = styled.h1`
  font-family: Gilroy-bold;
  font-size: 1.8em;
  letter-spacing: 1px;
`

const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    width: 35%;
    margin-right: 25px;
  }
`
const StyledParagraph = styled.p`
  margin-bottom: 10px;
  font-family: Gilroy-Regular;
  font-size: 1.1em;
  letter-spacing: 0.02em;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`
