import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ListItem from "../components/listitem"

import { slugify } from "../utils"

const ProjectsPage = () => {
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
`

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default ProjectsPage
