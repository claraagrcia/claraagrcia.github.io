import React from 'react'
import { Box, Avatar, Heading, Text, Stack, Divider, Tag, VStack, Link } from '@chakra-ui/react'
import cv from '../data/cv.json'

export default function Sidebar(){
  return (
    <Box w={{base:'100%', md:'280px'}} mr={{md:6}} mb={{base:6, md:0}}>
      <Box bg='white' borderRadius='md' p={4} boxShadow='sm'>
        <VStack spacing={3} align='start'>
          <Avatar size='xl' name={cv.name} src='/src/assets/avatar.svg' />
          <Box>
            <Heading size='md'>{cv.name}</Heading>
            <Text color='gray.500'>{cv.tagline}</Text>
          </Box>
          <Divider />
          <Box>
            <Heading size='sm' mb={2}>Contact</Heading>
            {cv.contact?.email && <Text><Link href={`mailto:${cv.contact.email}`}>{cv.contact.email}</Link></Text>}
            {cv.contact?.phone && <Text>{cv.contact.phone}</Text>}
            {cv.contact?.website && <Text><Link href={cv.contact.website} isExternal color='brand.600'>{cv.contact.website}</Link></Text>}
          </Box>

          <Box>
            <Heading size='sm' mb={2}>Skills</Heading>
            <Stack direction='row' wrap='wrap' spacing={2}>
              {(cv.skills||[]).map((s,i)=>(<Tag key={i} colorScheme='purple'>{s}</Tag>))}
            </Stack>
          </Box>

          <Box>
            <Heading size='sm' mb={2}>Languages</Heading>
            <VStack align='start'>
              {(cv.languages||[]).map((l,i)=> (<Text key={i}>{l}</Text>))}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
