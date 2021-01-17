import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import * as queryString from "query-string"
import styled from "styled-components"
import { gsap, ScrollTrigger } from "gsap/all"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ListItem from "../components/listitem"
import Button from "../components/button"
import { slugify } from "../utils"

const ProjectsPage = ({ location }) => {
  const [selectedFilters, setFilters] = React.useState([])
  React.useEffect(() => {
    const queryParams = queryString.parse(location.search, {
      arrayFormat: "comma",
    })
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
      gsap.registerPlugin(ScrollTrigger)

      const boxes = gsap.utils.toArray(".listItem-container")
      gsap.set(".listItem-container", { y: 100, opacity: 0 })
      ScrollTrigger.batch(boxes, {
        interval: 0.1,
        batchMax: 3,
        onEnter: batch =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: { each: 0.15, grid: [1, 3] },
            overwrite: true,
          }),
        onLeave: batch =>
          gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
        onEnterBack: batch =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeaveBack: batch =>
          gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
      })
      ScrollTrigger.addEventListener("refreshInit", () =>
        gsap.set(".listItem-container", { y: 0, opacity: 1 })
      )
      // boxes.forEach((listItem, i) => {
      //   console.log(i)
      //   const itemTl = gsap.timeline()
      //   itemTl.from(listItem, { opacity: 0, y: 30 })
      //   ScrollTrigger.create({
      //     animation: itemTl,
      //     trigger: listItem,
      //     toggleClass: "active",
      //     toggleActions: "play none none none",
      //     // this removes the class when the scrolltrigger is passed:
      //     // once: true,
      //   })
      // })
      const tl = gsap.timeline()
      //increase size of clipPath to reveal text
      tl.from(
        "h1",
        { height: 0, duration: 0.6, ease: "power1" },
        "reveal"
      ).from(".buttonsContainer", {
        opacity: 0,
        duration: 0.6,
        ease: "power1",
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

  const displayedProjects = filteredData?.length ? filteredData : edges
  // exclude filters which don't have any entry
  const availableFilters = Array.from(
    new Set(edges.map(project => project.node.type))
  )
  return (
    <Layout>
      <SEO title="Verkefni" />
      <div>
        <Title>Verkefni</Title>
        <ButtonsContainer className="buttonsContainer">
          {availableFilters.map(type => {
            return (
              <Button
                key={type}
                onClick={e => updateFilters(e, type)}
                isSelected={selectedFilters.includes(type)}
              >
                {type.substring(3, type.length)}
              </Button>
            )
          })}
          <Button onClick={e => setFilters([])} isSelected={false}>
            Fjarlægja síur
          </Button>
        </ButtonsContainer>
        <ProjectsContainer>
          {displayedProjects.map(project => {
            return (
              <StyledLink
                to={`/projects/${slugify(project.node.title)}`}
                key={project.node.title}
                className="content"
                cover
                bg="#c9d6df"
                direction="right"
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

const StyledLink = styled(AniLink)`
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Title = styled.h1`
  margin-left: 24px;
  font-family: Gilroy-bold;
  overflow: hidden;
`

const ButtonsContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`

export default ProjectsPage
