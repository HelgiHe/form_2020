import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Þessi síða virðist ekki vera til</h1>
    <Link to="/">
      <p>Smelltu hér til að fara á upphafssíðu</p>
    </Link>
  </Layout>
)

export default NotFoundPage
