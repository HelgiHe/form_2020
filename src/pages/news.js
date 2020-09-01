import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import ListItem from "../components/listitem"
import Layout from "../components/layout"
import SEO from "../components/seo"

const News = () => {
  const data = useStaticQuery(graphql`
    query NewsQuery {
      allSanityNews {
        edges {
          node {
            image {
              asset {
                url
              }
            }
            title
          }
        }
      }
    }
  `)
  const { allSanityNews } = data
  console.log(allSanityNews.edges)
  return (
    <Layout>
      <SEO title="Fréttir" />
      <Container>
        <h1>Fréttir</h1>
        <NewsContainer>
          {allSanityNews.edges.map(newsItem => {
            return (
              <ListItem
                title={newsItem.node.title}
                imagePath={`${newsItem.node.image.asset.url}?h=200`}
              />
            )
          })}
        </NewsContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding 12px; 24px;
`

const NewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default News
