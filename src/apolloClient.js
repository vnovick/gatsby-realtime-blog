import ApolloClient from "apollo-client"
import fetch from "isomorphic-fetch"
import React, { useState } from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { getMainDefinition } from "apollo-utilities"
import ws from "ws"
import { useAuth0 } from "./react-auth0-spa"

const createClient = token => {
  const http = new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    fetch,
  })

  const wsForNode = typeof window === "undefined" ? ws : null

  const wsClient = new SubscriptionClient(
    "ws://localhost:8080/v1/graphql",
    {
      reconnect: true,
      connectionParams: () => ({
        headers: token ? {
          Authorization: `Bearer ${token}`,
        } : {},
      }),
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

  return new ApolloClient({ link, cache: new InMemoryCache() })
}

const AuthenticatedApollo = ({ children }) => {
  const [token, setToken] = useState(null)
  const { isAuthenticated, ...auth } = useAuth0()
  if (isAuthenticated) {
    auth.getIdTokenClaims().then(({ __raw: token }) => setToken(token))
  }

  return (
    <ApolloProvider client={createClient(token)}>{children}</ApolloProvider>
  )
}

export const wrapRootElement = ({ children }) => {
  return <AuthenticatedApollo>{children}</AuthenticatedApollo>
}
