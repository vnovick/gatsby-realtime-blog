import ApolloClient from "apollo-client"
import fetch from "isomorphic-fetch"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { getMainDefinition } from "apollo-utilities"
import ws from "ws"

const http = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
  headers: {
    "x-hasura-admin-secret": process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET,
  },
  fetch,
})

const wsForNode = typeof window === "undefined" ? ws : null

const wsClient = new SubscriptionClient(
  "ws://localhost:8080/v1/graphql",
  {
    reconnect: true,
  },
  wsForNode
)

const websocket = new WebSocketLink(wsClient)

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === "OperationDefinition" && operation === "subscription"
  },
  websocket,
  http
)

export const client = new ApolloClient({ link, cache: new InMemoryCache() })

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)