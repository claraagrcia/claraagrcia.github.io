import React, { useState, useEffect } from 'react'
import cvDataDefault from '../data/cv.json'
import projectsDefault from '../data/projects.json'
import {
  Box, Heading, Input, Textarea, Button, Stack, Tag, HStack, VStack, FormControl, FormLabel, CloseButton
} from '@chakra-ui/react'

const CV_KEY = 'cv-data'
const PROJECTS_KEY = 'projects-data'

function useLocalData(key, defaultValue){
  const [data, setData] = useState(() => {
    try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : defaultValue }catch(e){ return defaultValue }
  })
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(data)) }catch(e){} }, [key, data])
  return [data, setData]
}

function ItemBox({children}){ return <Box borderWidth={1} borderRadius='md' p={3} mb={3}>{children}</Box> }

export default function Admin(){
  const [cv, setCv] = useLocalData(CV_KEY, cvDataDefault)
  const [projects, setProjects] = useLocalData(PROJECTS_KEY, projectsDefault)
  const [exportText, setExportText] = useState('')

  useEffect(()=> setExportText(JSON.stringify({cv, projects}, null, 2)), [cv, projects])

  // Helpers
  const updateCv = obj => setCv({...cv, ...obj})
  const addSkill = s => setCv({...cv, skills: [...(cv.skills||[]), s]})
  const removeSkill = idx => setCv({...cv, skills: cv.skills.filter((_,i)=>i!==idx)})
  const addExperience = ()=> setCv({...cv, experience: [...(cv.experience||[]), {role:'',company:'',dates:'',description:''}]})
  const updateExperience = (i, next)=> setCv({...cv, experience: cv.experience.map((it,idx)=>idx===i?next:it)})
  const removeExperience = i=> setCv({...cv, experience: cv.experience.filter((_,idx)=>idx!==i)})
  const addEducation = ()=> setCv({...cv, education: [...(cv.education||[]), {degree:'',institution:'',dates:''}]})
  const updateEducation = (i, next)=> setCv({...cv, education: cv.education.map((it,idx)=>idx===i?next:it)})
  const removeEducation = i=> setCv({...cv, education: cv.education.filter((_,idx)=>idx!==i)})

  const addProject = ()=> setProjects([...projects, {title:'',tech:[],description:'',link:'',repo:''}])
  const updateProject = (i, next)=> setProjects(projects.map((p,idx)=>idx===i?next:p))
  const removeProject = i=> setProjects(projects.filter((_,idx)=>idx!==i))

  function importJSON(raw){
    try{
      const parsed = JSON.parse(raw)
      if(parsed.cv) setCv(parsed.cv)
      if(parsed.projects) setProjects(parsed.projects)
      alert('Imported successfully')
    }catch(e){ alert('Invalid JSON') }
  }

  return (
    <Box>
      <Heading mb={4}>Admin</Heading>

      <ItemBox>
        <Heading size='sm' mb={2}>Personal</Heading>
        <Stack>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={cv.name||''} onChange={e=>updateCv({name:e.target.value})} />
          </FormControl>
          <FormControl>
            <FormLabel>Tagline</FormLabel>
            <Input value={cv.tagline||''} onChange={e=>updateCv({tagline:e.target.value})} />
          </FormControl>
          <FormControl>
            <FormLabel>About</FormLabel>
            <Textarea value={cv.about||''} onChange={e=>updateCv({about:e.target.value})} />
          </FormControl>
        </Stack>
      </ItemBox>

      <ItemBox>
        <Heading size='sm' mb={2}>Experience</Heading>
        <VStack align='stretch'>
          {(cv.experience||[]).map((exp,i)=> (
            <Box key={i}>
              <HStack justify='space-between'>
                <Heading size='xs'>Entry {i+1}</Heading>
                <CloseButton size='sm' onClick={()=>removeExperience(i)} />
              </HStack>
              <Stack mt={2}>
                <Input placeholder='Role' value={exp.role} onChange={e=>updateExperience(i,{...exp, role:e.target.value})} />
                <Input placeholder='Company' value={exp.company} onChange={e=>updateExperience(i,{...exp, company:e.target.value})} />
                <Input placeholder='Dates' value={exp.dates} onChange={e=>updateExperience(i,{...exp, dates:e.target.value})} />
                <Textarea placeholder='Description' value={exp.description} onChange={e=>updateExperience(i,{...exp, description:e.target.value})} />
              </Stack>
            </Box>
          ))}
          <Button onClick={addExperience}>Add experience</Button>
        </VStack>
      </ItemBox>

      <ItemBox>
        <Heading size='sm' mb={2}>Education</Heading>
        <VStack align='stretch'>
          {(cv.education||[]).map((ed,i)=> (
            <Box key={i}>
              <HStack justify='space-between'>
                <Heading size='xs'>Entry {i+1}</Heading>
                <CloseButton size='sm' onClick={()=>removeEducation(i)} />
              </HStack>
              <Stack mt={2}>
                <Input placeholder='Degree' value={ed.degree} onChange={e=>updateEducation(i,{...ed, degree:e.target.value})} />
                <Input placeholder='Institution' value={ed.institution} onChange={e=>updateEducation(i,{...ed, institution:e.target.value})} />
                <Input placeholder='Dates' value={ed.dates} onChange={e=>updateEducation(i,{...ed, dates:e.target.value})} />
              </Stack>
            </Box>
          ))}
          <Button onClick={addEducation}>Add education</Button>
        </VStack>
      </ItemBox>

      <ItemBox>
        <Heading size='sm' mb={2}>Skills</Heading>
        <HStack>
          <Input placeholder='New skill' id='newSkill' />
          <Button onClick={()=>{ const v=document.getElementById('newSkill').value.trim(); if(v){ addSkill(v); document.getElementById('newSkill').value=''; } }}>Add</Button>
        </HStack>
        <HStack mt={3} spacing={2}>
          {(cv.skills||[]).map((s,i)=> (
            <Tag key={i}>{s} <CloseButton size='sm' ml={2} onClick={()=>removeSkill(i)} /></Tag>
          ))}
        </HStack>
      </ItemBox>

      <ItemBox>
        <Heading size='sm' mb={2}>Projects</Heading>
        <VStack align='stretch'>
          {projects.map((p,i)=> (
            <Box key={i}>
              <HStack justify='space-between'>
                <Heading size='xs'>{p.title||`Project ${i+1}`}</Heading>
                <CloseButton size='sm' onClick={()=>removeProject(i)} />
              </HStack>
              <Stack mt={2}>
                <Input placeholder='Title' value={p.title} onChange={e=>updateProject(i,{...p, title:e.target.value})} />
                <Input placeholder='Tech (comma separated)' value={(p.tech||[]).join(', ')} onChange={e=>updateProject(i,{...p, tech: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
                <Textarea placeholder='Description' value={p.description} onChange={e=>updateProject(i,{...p, description:e.target.value})} />
                <Input placeholder='Live link' value={p.link} onChange={e=>updateProject(i,{...p, link:e.target.value})} />
                <Input placeholder='Repo link' value={p.repo} onChange={e=>updateProject(i,{...p, repo:e.target.value})} />
              </Stack>
            </Box>
          ))}
          <Button onClick={addProject}>Add project</Button>
        </VStack>
      </ItemBox>

      <ItemBox>
        <Heading size='sm' mb={2}>Export / Import</Heading>
        <Textarea value={exportText} readOnly rows={8} />
        <HStack mt={2}>
          <Button onClick={()=>navigator.clipboard.writeText(exportText)}>Copy export</Button>
          <Textarea id='importBox' placeholder='Paste JSON here to import' rows={4} />
          <Button onClick={()=>importJSON(document.getElementById('importBox').value)}>Import JSON</Button>
        </HStack>
      </ItemBox>
    </Box>
  )
}
