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
  const queryNewsResults = await graphql(`
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
                fluid(maxWidth: 700) {
                  base64
                  srcWebp
                  srcSetWebp
                  src
                  srcSet
                  sizes
                  aspectRatio
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

  const articleTemplate = path.resolve(`src/templates/article.js`)
  queryNewsResults.data.allSanityNews.edges.forEach(newsItem => {
    createPage({
      path: `/news/${slugify(newsItem.node.title)}`,
      component: articleTemplate,
      context: {
        article: newsItem,
      },
    })
  })

  const allProjectsQueryResults = await graphql(`
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
            title
          }
        }
      }
    }
  `)

  const projectTemplate = path.resolve(`src/templates/project.js`)
  allProjectsQueryResults.data.allSanityVerk.edges.forEach(projectItem => {
    createPage({
      path: `/projects/${slugify(projectItem.node.title)}`,
      component: projectTemplate,
      context: {
        project: projectItem,
      },
    })
  })
}
