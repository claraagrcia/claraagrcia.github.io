import React from 'react'
import projects from '../data/projects.json'
import { Heading, Box, Text, Stack, HStack, Tag, Link as CLink } from '@chakra-ui/react'

export default function Portfolio(){
  return (
    <Box>
      <Heading mb={4}>Portfolio</Heading>
      <Stack spacing={4}>
        {projects.map((p, i) => (
          <Box key={i} borderWidth={1} borderRadius="md" p={4}>
            <Heading size="sm">{p.title}</Heading>
            <HStack spacing={2} mt={2}>
              {p.tech.map((t, j)=>(<Tag key={j} colorScheme="purple">{t}</Tag>))}
            </HStack>
            <Text mt={3}>{p.description}</Text>
            <HStack mt={3} spacing={3}>
              {p.link && <CLink href={p.link} isExternal color="purple.600">Live</CLink>}
              {p.repo && <CLink href={p.repo} isExternal color="purple.600">Repo</CLink>}
            </HStack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
