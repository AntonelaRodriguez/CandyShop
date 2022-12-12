import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import React from 'react'
import img from '../../assets/heroImage/heroImage.svg'

const Hero = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row', lg: 'row' }}
      justifyContent="center"
      align="center"
    >
      <Flex
        width="full"
        gap={10}
        direction="column"
        justifyContent="space-between"
        align="flex-start"
        height="full"
        textAlign="left"
      >
        <Flex
          width={{ base: 'full', md: '50%', lg: '53%' }}
          direction="column"
          justifyContent="flex-end"
          align="center"
          gap={5}
          textAlign="left"
        >
          <Heading
            fontSize={{ base: '4xl', lg: '6xl' }}
            width={'full'}
            as="h1"
            fontWeight="bold"
            color="blackAlpha.900"
          >
            Discover Most Delicious Candy
          </Heading>
          <Text
            w={'full'}
            as={'p'}
            fontWeight="light"
            fontSize="-moz-initial"
            color="gray.500"
          >
            Find the best and delicious candy here. We focus on
            product quality. Here you can find candy of almost all
            brands. So why you are waiting? Just order now!
          </Text>
        </Flex>
      </Flex>
      <Stack
        display={{ base: 'none', md: 'flex', lg: 'flex' }}
        width="50%"
        height={'563px'}
      >
        <Image
          boxSize="200px"
          width="full"
          height={'full'}
          src={img}
          alt="Dan Abramov"
        />
      </Stack>
    </Flex>
  )
}

export default Hero
