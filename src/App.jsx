import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Box, Flex, Heading, HStack, Spacer, Container, SimpleGrid } from '@chakra-ui/react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Box minH="100vh">
      <Box bg="gray.50" borderBottomWidth={1} as="header">
        <Container maxW="container.md">
          <Flex py={3} align="center">
            <Heading size="md">Clara</Heading>
            <Spacer />
            <HStack spacing={4}>
              <Link to="/">Home</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/admin">Admin</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container as="main" maxW="container.lg" py={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box gridColumn={{ base: '1', md: '1 / span 1' }}>
            <Sidebar />
          </Box>
          <Box gridColumn={{ base: '1', md: '2 / span 2' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Box>
        </SimpleGrid>
      </Container>

      <Box as="footer" textAlign="center" py={6} color="gray.600">
        © {new Date().getFullYear()} Clarita
      </Box>
    </Box>
  )
}
