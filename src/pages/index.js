import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Heim" />
      <Link to="/news/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export const query = graphql`
  query Featured {
    allSanityVerk(filter: { featured: { eq: true } }) {
      edges {
        node {
          title
          featured
          imagesGallery {
            asset {
              url
            }
          }
          description {
            _rawChildren
          }
        }
      }
    }
  }
`

export default IndexPage
