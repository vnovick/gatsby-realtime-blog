import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Article from "../components/article"


const BlogPostTemplate = ({ data, pageContext, location }) => {

  let post = data.blog.post[0];

  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.description || post.excerpt}
      />
      <Article initialData={post}/>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.id} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.id} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById($id: hasura_uuid!) {
    site {
      siteMetadata {
        title
      }
    }
    blog {
        post: articles(where:{ id: {_eq: $id }}) {
          id
          title
          body
          date
          excerpt
          author {
            id
            bio
            avatar_url
            user {
              name
              email
            }
          }
        }
    }
  }
`
