const path = require("path")

const slugify = string => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;"
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

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
