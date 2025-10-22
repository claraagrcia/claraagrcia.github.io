import React from 'react'
import cvData from '../data/cv.json'
import { Box, Heading, Text, Stack, Badge, Wrap, WrapItem } from '@chakra-ui/react'

function About(){
  return (
    <Box mb={6}>
      <Heading>{cvData.name}</Heading>
      <Text color="gray.600" mt={2}>{cvData.tagline}</Text>
      <Text mt={4}>{cvData.about}</Text>
    </Box>
  )
}

function CV(){
  return (
    <Box>
      <Heading size="md" mb={4}>CV</Heading>
      <Stack spacing={6}>
        <Box>
          <Heading size="sm">Experience</Heading>
          <Stack mt={2} spacing={3}>
            {cvData.experience.map((e, i) => (
              <Box key={i}>
                <Text fontWeight={600}>{e.role} <Text as="span" fontWeight={400}>— {e.company}</Text></Text>
                <Text fontSize="sm" color="gray.500">{e.dates}</Text>
                <Text mt={2}>{e.description}</Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          <Heading size="sm">Education</Heading>
          <Stack mt={2} spacing={2}>
            {cvData.education.map((ed, i) => (
              <Box key={i}>
                <Text fontWeight={600}>{ed.degree} <Text as="span" fontWeight={400}>— {ed.institution}</Text></Text>
                <Text fontSize="sm" color="gray.500">{ed.dates}</Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          <Heading size="sm">Skills</Heading>
          <Wrap mt={2}>
            {cvData.skills.map((s, i) => (
              <WrapItem key={i}><Badge colorScheme="purple">{s}</Badge></WrapItem>
            ))}
          </Wrap>
        </Box>
      </Stack>
    </Box>
  )
}

export default function Home(){
  return (
    <Box>
      <About />
      <CV />
    </Box>
  )
}
