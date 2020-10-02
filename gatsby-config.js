require("dotenv").config()
const isProd = process.env.NODE_ENV === "production"

module.exports = {
  siteMetadata: {
    title: `Form Ráðgjöf`,
    description: `Form ráðgjöf er Arkitektarstofa á Akureyri`,
    author: `Helgi Helgason`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-netlify`,
    },
    {
      resolve: `gatsby-plugin-transition-link`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-114305695-2",
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/static/fonts`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: "production",
        token: process.env.SANITY_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Form ráðgjöf`,
        short_name: `Form`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/form_logo_bkg.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
