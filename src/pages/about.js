import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import { Phone, Mail, Home } from "@material-ui/icons"
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
                      <StyledParagraph key={_rawChildren[0]._key}>
                        {_rawChildren[0].text}
                      </StyledParagraph>
                    )
                  )}
                </span>
              </StyledSection>
              <ContactContainer>
                <h3>Hafa Samband</h3>
                <IconContainer>
                  <Home />
                  <ContactInfo>
                    <a
                      href="https://www.google.com/maps/place/Kaupangur/@65.6792233,-18.1110733,17z/data=!3m1!4b1!4m5!3m4!1s0x48d28f04134104fd:0x8ef7b925e189c8d3!8m2!3d65.6792211!4d-18.1088846"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Kaupangur
                    </a>
                  </ContactInfo>
                </IconContainer>
                <IconContainer>
                  <Phone />
                  <ContactInfo>462 6099</ContactInfo>
                </IconContainer>
                <IconContainer>
                  <Phone />
                  <ContactInfo>891 7970</ContactInfo>
                </IconContainer>
                <IconContainer>
                  <Mail />
                  <ContactInfo>
                    <a href="mailto: formradgjof@formradgjof.is">
                      formradgjof@formradgjof.is
                    </a>
                  </ContactInfo>
                </IconContainer>
              </ContactContainer>
            </AboutContainer>
          </Layout>
        )
      }}
    />
  )
}

const AboutContainer = styled.div`
  padding: 0px 24px;
`

const StyledHeading = styled.h1`
  font-family: Gilroy-bold;
  font-size: 1.8em;
  letter-spacing: 1px;
`

const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 36px;
  @media (min-width: 768px) {
    max-width: 450px;
    margin-right: 25px;
  }
`
const StyledParagraph = styled.p`
  margin-bottom: 10px;
  font-family: Gilroy-Regular;
  font-size: 1.12em;
  letter-spacing: 0.02em;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ContactInfo = styled.div`
  margin-left: 12px;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  align-items: center;
`
