import React from "react"
import { StaticQuery, graphql } from "gatsby"
export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          allSanityAbout {
            edges {
              node {
                image {
                  asset {
                    url
                    title
                  }
                }
                about {
                  _rawChildren
                }
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data)
        return (
          <header>
            <h1>About</h1>
          </header>
        )
      }}
    />
  )
}
