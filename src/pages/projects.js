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
                url
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
      <Container>
        <Title>Verkefni</Title>
        <ProjectsContainer>
          {edges.map(project => {
            return (
              <Link
                to={`/projects/${slugify(project.node.title)}`}
                key={project.node.title}
              >
                <ListItem
                  title={project.node.title}
                  imagePath={`${project.node.imagesGallery[0].asset.url}?w=200`}
                  type={project.node.type.substring(
                    3,
                    project.node.type.length
                  )}
                />
              </Link>
            )
          })}
        </ProjectsContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.div``

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
