import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading, SimpleGrid } from "@chakra-ui/core"
import { Router } from "@reach/router"


const Dashboard = () => {

    

  return (
    <Layout title="Dashboard">
      <SEO title="Dashboard" />
      <Heading>TODO: Auth section</Heading>
      <SimpleGrid></SimpleGrid>
    </Layout>
  )
}

const Profile = () => <p>Settings</p>
const EditPage = ({ id }) => (
  <Layout title="Edit Post">
    <SEO title="Edit" />
    <Heading>{`TODO: Edit Post ${id}`}</Heading>
  </Layout>
)

const Account = () => {
  return (
    <Router>
      <Dashboard path="account" />
      <EditPage path="account/edit/:id" />
      <Profile path="account/profile" />
    </Router>
  )
}

export default Account
