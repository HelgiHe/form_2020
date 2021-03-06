import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import gsap from "gsap"
import SEO from "../components/seo"
import { Phone, Mail, Home } from "@material-ui/icons"
import styled from "styled-components"
import Layout from "../components/layout"

export default function About() {
  React.useEffect(() => {
    if (typeof document !== undefined) {
      const tl = gsap.timeline()
      //increase size of clipPath to reveal text
      tl.from(
        "h1",
        { height: 0, duration: 0.6, ease: "power1" },
        "reveal"
      ).from(".content", {
        opacity: 0,
        duration: 0.8,
        ease: "power1",
      })
    }
  }, [])
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          allSanityAbout {
            edges {
              node {
                image {
                  asset {
                    fluid(maxWidth: 700) {
                      aspectRatio
                      base64
                      sizes
                      src
                      srcSet
                      srcSetWebp
                      srcWebp
                    }
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
              <div className="content">
                <StyledSection>
                  <StyledImage
                    fluid={allSanityAbout.edges[0].node.image.asset.fluid}
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
                  <ContactHeading>Hafa Samband</ContactHeading>
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
              </div>
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

const ContactHeading = styled.h3`
  font-family: Gilroy-Bold;
`

const StyledHeading = styled.h1`
  font-family: Gilroy-bold;
  font-size: 1.8em;
  letter-spacing: 1px;
  overflow: hidden;
`

const StyledImage = styled(Image)`
  width: 100%;

  margin-bottom: 36px;
  @media (min-width: 868px) {
    width: 550px;
    height: 500px;
    min-width: 500px;
    margin-right: 24px;
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
  @media (min-width: 868px) {
    flex-direction: row;
  }
`
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-bottom: 24px;
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
