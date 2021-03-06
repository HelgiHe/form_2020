import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import gsap from "gsap"
import ListItem from "../components/listitem"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { slugify } from "../utils"

const News = () => {
  React.useEffect(() => {
    if (typeof document !== undefined) {
      const tl = gsap.timeline()
      tl.from(
        "h1",
        { height: 0, duration: 0.6, ease: "power1" },
        "reveal"
      ).from(".content", {
        opacity: 0,
        duration: 0.6,
        ease: "power1",
        stagger: 0.1,
      })
    }
  }, [])
  const data = useStaticQuery(graphql`
    query NewsQuery {
      allSanityNews(sort: { fields: [_createdAt], order: DESC }) {
        edges {
          node {
            title
            text {
              _rawChildren
            }
            image {
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
            author
            _createdAt
          }
        }
      }
    }
  `)
  const { allSanityNews } = data
  return (
    <Layout>
      <SEO title="Fréttir" />
      <div>
        <TextEffect className="texteffect">
          <Title>Fréttir</Title>
        </TextEffect>
        <NewsContainer>
          {allSanityNews.edges.map(newsItem => {
            return (
              <StyledLink
                to={`/news/${slugify(newsItem.node.title)}`}
                key={newsItem.node.title}
                className="content"
                cover
                bg="#c9d6df"
                direction="right"
              >
                <ListItem
                  title={newsItem.node.title}
                  imagePath={newsItem.node.image.asset}
                  author={newsItem.node.author}
                />
              </StyledLink>
            )
          })}
        </NewsContainer>
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

const TextEffect = styled.div`
width: "200px",
height: "42px",
`

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
`

export default News
