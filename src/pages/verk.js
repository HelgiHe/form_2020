import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const VerkPage = () => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allSanityVerk {
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
  return (
    <Layout>
      <SEO title="Verkefni" />
      <h1>Verkefni</h1>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default VerkPage
