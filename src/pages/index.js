import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { PseudoBox, Heading, Text, SimpleGrid, Badge } from "@chakra-ui/core"
//Dynamic
import gql from "graphql-tag"
import { useSubscription } from "@apollo/react-hooks"

function Article({ id, title, excerpt, date, isNew, isPublished, ...rest }) {
  return (
    <Link style={{ boxShadow: `none` }} to={isNew ? `/post/${id}` : id}>
      <PseudoBox
        p={5}
        width="100%"
        shadow="md"
        borderWidth="2px"
        _hover={{ bg: "tomato", color: " white" }}
        m="10"
        borderRadius="lg"
        {...rest}
        color="white"
      >
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{excerpt}</Text>
        <Text mt={2}>{date}</Text>
        {isNew ? <Badge variantColor="red">Dynamic - no static page</Badge> : null }
        {!isPublished ? <Badge variantColor="yellow">Draft</Badge> : null}
      </PseudoBox>
    </Link>
  )
}

const SUBSCRIBE_TO_BLOG_POST_UPDATES = gql`
  subscription subscribeToBlogPosts {
    articles {
      id
      title
      body
      date
      excerpt
      is_published
    }
  }
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  let posts = data.allArticles.posts

  const { data: subData } = useSubscription(SUBSCRIBE_TO_BLOG_POST_UPDATES, {
    suspend: false,
  })

  const existingIds = posts.map(post => post.id)

  if (subData) {
    posts = subData.articles
  }
  
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="40px">
      {posts.map(post => {
        const title = post.title
        return (
          <Article
            id={post.id}
            title={post.title}
            key={post.id}
            date={post.date}
            excerpt={post.description || post.excerpt}
            isNew={!existingIds.includes(post.id)}
            isPublished={post.is_published}
          />
        )
      })}
      </SimpleGrid>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allArticles: blog {
      posts: articles(order_by: { date: desc, title: desc }, limit: 1000) {
        id
        title
        body
        date
        excerpt
      }
    }
  }
`
