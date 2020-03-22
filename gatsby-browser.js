// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism.css"
import React from "react"
import { Auth0Provider } from "./src/react-auth0-spa"
import config from "./auth_config.json"
import { wrapRootElement as ApolloWrapper } from "./src/apolloClient"
import {
    navigate
  } from "@reach/router"

const onRedirectCallback = appState => {
    navigate(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  };

export const wrapRootElement = ({ element }) => (
    <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={`${window.location.origin}/account`}
    onRedirectCallback={onRedirectCallback}
    >
    <ApolloWrapper>
      {element}
  </ApolloWrapper>
    </Auth0Provider>
)
