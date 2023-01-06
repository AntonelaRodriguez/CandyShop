import { Button, Flex, Heading, Image, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import img from '../../assets/heroImage/ferrero.webp'
import { motion } from 'framer-motion'

const Hero = () => {
  const productos = useSelector((s) => s.products)
  const images = productos.map((p) => p.image)
  let random = Math.floor(Math.random() * images.length)

  let imageHearo = images[random]

  return (
    <Flex
      display={{ base: 'none', md: 'flex', lg: 'flex' }}
      direction={{ base: 'column', md: 'row', lg: 'row' }}
      justifyContent={{ base: 'center', sm: 'center', md: 'space-between', lg: 'space-between' }}
      align='center'
      gap={5}
      padding={10}
      w='full'
      h='auto'
      minW='full'
      boxShadow='base'
    >
      <Flex
        width='full'
        direction='column'
        justifyContent='center'
        align='flex-start'
        h='full'
        minH='full'
        textAlign='left'
      >
        <Flex
          width={{ base: 'full', md: 'full', lg: '68%' }}
          direction='column'
          justifyContent='center'
          p={10}
          h='full'
          align='flex-start'
          gap={5}
          textAlign='left'
        >
          <Heading
            fontSize={{ base: '4xl', lg: '6xl' }}
            width='full'
            as='h1'
            fontWeight={700}
            color='blackAlpha.900'
            display='block'
          >
            Discover Most Delicious Candy
          </Heading>
          <Text display='block' textAlign='left' w='full' fontWeight={300} color='gray.500'>
            Find the best and delicious candy here. We focus on product quality. Here you can find
            candy of almost all brands. So why you are waiting? Just order now!
          </Text>
        </Flex>
      </Flex>
      <Stack p={10} display={{ base: 'none', md: 'flex', lg: 'flex' }} width='full' height='full'>
        <motion.article
          animate={{
            scale: [1, 1.3, 1.3, 1, 1],
            rotate: [0, 0, 270, 270, 10]
          }}
          transition={{
            repeat: 1,
            repeatType: 'reverse',
            duration: 2,
            repeatDelay: 10
          }}
        >
          <Image
            maxW={350}
            objectFit='cover'
            loading='lazy'
            width='full'
            height='full'
            margin='auto'
            src={imageHearo || img}
            alt='Dan Abramov'
          />
        </motion.article>
      </Stack>
    </Flex>
  )
}

export default Hero
