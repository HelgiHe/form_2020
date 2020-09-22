import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import gsap from "gsap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ListItem from "../components/listitem"

import { slugify } from "../utils"

const ProjectsPage = () => {
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
        stagger: 0.05,
      })
    }
  }, [])

  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allSanityVerk(sort: { fields: [_createdAt], order: DESC }) {
        edges {
          node {
            description {
              _rawChildren
            }
            imagesGallery {
              asset {
                fluid(maxWidth: 450) {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                }
              }
            }
            type
            title
          }
        }
      }
    }
  `)
  const {
    allSanityVerk: { edges },
  } = data
  return (
    <Layout>
      <SEO title="Verkefni" />
      <div>
        <Title>Verkefni</Title>
        <ProjectsContainer>
          {edges.map(project => {
            return (
              <StyledLink
                to={`/projects/${slugify(project.node.title)}`}
                key={project.node.title}
                className="content"
              >
                <ListItem
                  title={project.node.title}
                  imagePath={project.node.imagesGallery[0].asset}
                  type={project.node.type.substring(
                    3,
                    project.node.type.length
                  )}
                />
              </StyledLink>
            )
          })}
        </ProjectsContainer>
      </div>
    </Layout>
  )
}

const StyledLink = styled(Link)`
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Title = styled.h1`
  margin-left: 24px;
  font-family: Gilroy-bold;
  overflow: hidden;
`

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default ProjectsPage
