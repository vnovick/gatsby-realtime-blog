import React from "react"
import { Link } from "gatsby"
import { Box, Heading, Stack, Flex, Button, Text } from "@chakra-ui/core";

import { rhythm, scale } from "../utils/typography"


const Layout = ({ location, title, children }) => {

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const rootPath = `${__PATH_PREFIX__}/`
  let header

  
  return (
    <Stack>
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="tomato"
      px={5}
      py={4}
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
        <Link
          to={`/`}
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
        >
          {title}
        </Link>
        </Heading>
      </Flex>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Login
        </Button>
      </Box>
    </Flex> 
    <Flex color="white" direction="column" align="center" justify="space-between" height="calc(100vh - 120px)">
      <Box as="main" heigh="100%">{children}</Box>
    </Flex>
    </Stack>
  )
}

export default Layout
