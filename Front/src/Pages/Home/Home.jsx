import { Container } from '@chakra-ui/react'
import React from 'react'
import Hero from '../../Components/Hero/Hero'
import Nav from '../../Components/Nav/Nav'

const Home = () => {
  return (
    <Container maxW="container.xl">
      <Nav />
      <Hero />
    </Container>
  )
}

export default Home
