import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Heading, SimpleGrid } from "@chakra-ui/core"
import { Router } from "@reach/router"
import Article from '../components/article'

const Post = ({ id }) => {
  return (
    <Layout title="Dynamic Post">
        <Article initialData={{id }} isDynamic/>
    </Layout>
  )
}

const Account = () => {
  return (
    <Router>
      <Post path="post/:id" />
    </Router>
  )
}

export default Account
