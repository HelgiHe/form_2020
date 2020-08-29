import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NewsPage = () => {
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
            text {
              _rawChildren
            }
          }
        }
      }
    }
  `)
  console.log(data.allSanityNews.edges)
  return (
    <Layout>
      <SEO title="Fréttir" />
      <h1>Fréttir</h1>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default NewsPage
