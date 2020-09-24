import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import * as queryString from "query-string"
import styled from "styled-components"
import gsap from "gsap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ListItem from "../components/listitem"
import Button from "../components/button"
import { slugify, allFilters } from "../utils"

const ProjectsPage = ({ location }) => {
  console.log({ location })
  const [selectedFilters, setFilters] = React.useState([])
  React.useEffect(() => {
    const queryParams = queryString.parse(location.search, {
      arrayFormat: "comma",
    })
    console.log(queryParams)
    if (queryParams && queryParams.filters) {
      const queryFilters = queryParams.filters
      if (typeof queryFilters === "string") {
        setFilters([queryFilters])
      } else {
        setFilters(queryFilters)
      }
    }
  }, [])

  React.useEffect(() => {
    const queryParams = queryString.stringify(
      { filters: selectedFilters },
      {
        encode: true,
        arrayFormat: "comma",
      }
    )
    window.history.pushState(
      {},
      "",
      `${location.origin}${location.pathname}?${queryParams}`
    )
  }, [selectedFilters])

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
        stagger: 0.1,
      })
    }
  }, [])
  const updateFilters = (event, appliedFilter) => {
    event.preventDefault()
    if (selectedFilters.includes(appliedFilter)) {
      const newFilters = selectedFilters.filter(
        filter => filter !== appliedFilter
      )
      setFilters(newFilters)
    } else {
      const newFilters = [...selectedFilters, appliedFilter]
      setFilters(newFilters)
    }
  }

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
  const filteredData = edges.filter(project =>
    selectedFilters.includes(project.node.type)
  )

  const availableFilters = Array.from(
    new Set(edges.map(project => project.node.type))
  )
  return (
    <Layout>
      <SEO title="Verkefni" />
      <div>
        <Title>Verkefni</Title>
        {availableFilters.map(type => {
          return (
            <div key={type}>
              <Button onClick={e => updateFilters(e, type)}>
                {type.substring(3, type.length)}
              </Button>
            </div>
          )
        })}
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
  flex-direction: column;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`

export default ProjectsPage
