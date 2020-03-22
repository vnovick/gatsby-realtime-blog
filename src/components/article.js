import React from "react"
import { rhythm, scale } from "../utils/typography"
import Author from "../components/author"
//Dynamic
import gql from "graphql-tag"
import { useSubscription } from "@apollo/react-hooks"
import {  Heading, Text, SimpleGrid, Badge } from "@chakra-ui/core"


const SUBSCRIBE_TO_BLOG_POST_UPDATES = gql`
  subscription subscribeToBlogPostById($id: uuid) {
    articles(where: { id: { _eq: $id } }) {
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
`


const Article = ({ initialData, isDynamic }) => {

  let post = initialData;
  console.log(post)

  const { data: subData, loading, error } = useSubscription(
    SUBSCRIBE_TO_BLOG_POST_UPDATES,
    {
      variables: { id: post.id },
    }
  )

  console.log("Running subscription", post, subData, loading, error)

  if (subData) {
      post = subData.articles[0]
  }
 
  
  if (!post && isDynamic) {
    return null
  }

  return (
    <article>
      <header>
        <Heading as="h2"
        >
          {post.title}
        </Heading>
        <Text
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {post.date}
        </Text>
      </header>
      <section dangerouslySetInnerHTML={{ __html: post.body }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    </article>
  )
}

export default Article
