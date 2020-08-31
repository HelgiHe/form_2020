import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const VerkPage = () => {
  return (
    <Layout>
      <SEO title="Verkefni" />
      <h1>Fréttir</h1>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default VerkPage
