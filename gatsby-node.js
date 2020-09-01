const path = require("path")

const slugify = input =>
  input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\x00-\x7F]/g, "")
    .slice(0, 200)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
    query AllNews {
      allSanityNews(sort: { fields: [_createdAt], order: DESC }) {
        edges {
          node {
            title
            text {
              _rawChildren
            }
            image {
              asset {
                url
              }
            }
            author
            _createdAt
          }
        }
      }
    }
  `)

  const articleTemplate = path.resolve(`src/templates/article.js`)
  queryResults.data.allSanityNews.edges.forEach(newsItem => {
    createPage({
      path: `/news/${slugify(newsItem.node.title)}`,
      component: articleTemplate,
      context: {
        article: newsItem,
      },
    })
  })
}
