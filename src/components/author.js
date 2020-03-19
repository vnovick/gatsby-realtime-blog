/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Author = ({ avatar_url, user: { name, email }}) => {
  
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        url={avatar_url}
        alt={name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
      />
      <p>
        Written by <strong>{name}</strong> {email}
      </p>
    </div>
  )
}

export default Author
