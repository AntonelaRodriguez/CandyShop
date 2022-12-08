import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import stars from '../../assets/starsProductDetail/stars.svg'

const ProductDetail = () => {
  const [cantidad, setCantidad] = useState(0)

  const increment = () => {
    setCantidad(cantidad + 1)
  }

  const decrement = () => {
    cantidad > 0 ? setCantidad(cantidad - 1) : cantidad
  }
  return (
    <Flex
      w="full"
      direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
      justifyContent="space-between"
      borderRadius="md"
      
      height="full"
      margin="auto"
      boxShadow="2xl"
    >
      <Stack
        borderStartRadius="md"
        width={{ base: '100%', sm: '100%', md: '50%' }}
        minHeight="full"
        bg="#E3E5FA"
        align="center"
        justify="center"
        position="relative"
      >
        <Box
          borderStartRadius="md"
          backgroundImage="https://dulcilandia.com.ar/par/wp-content/uploads/sites/4/2020/04/04950085.png"
          backgroundPosition="center center"
          backgroundRepeat="no-repeat"
          bgSize="contain"
          boxSize="md"
          width="full"
        ></Box>
        <Link to="/ ">
          <Button
            position="absolute"
            colorScheme="primary"
            variant="outline"
            top={15}
            left={15}
          >
            Home
          </Button>
        </Link>
      </Stack>
      <Stack minHeight="full" width={{ base: '100%', sm: '100%', md: '50%' }}>
        <Flex
          minH="full"
          h="full"
          direction={{ base: 'column' }}
          align="flex-start"
          justifyContent="space-between"
          p={10}
          gap={5}
        >
          <Heading as="h2" fontSize={48} fontWeight="bold">
            Product name
          </Heading>
          <Stack direction="row">
            <Badge colorScheme="primary">cofler</Badge>
            <Badge colorScheme="green">Arcor</Badge>
            <Badge colorScheme="red">Ford</Badge>
            <Badge colorScheme="purple">Felford</Badge>
          </Stack>
          <Stack direction="row" align="center" justify="flex-start">
            <Flex align="center" justify="center" gap={1.5}>
              <Image src={stars} />
              <Image src={stars} />
              <Image src={stars} />
              <Image src={stars} />
              <Image src={stars} />
            </Flex>
            <Text>246 Reviews</Text>
          </Stack>

          <Stack>
            <Text fontWeight={600} fontSize="2xl">
              Description :
            </Text>
            <Text fontWeight={300}>
              Makanan yang lengkap dan seimbang, dengan 41 nutrisi penting.
              Mengandung antioksidan (vitamin E dan selenium) untuk sistem
              kekebalan tubuh yang sehat. Mengandung serat untuk memperlancar
              pencernaan dan meningkatkan kesehatan usus. Diperkaya dengan
              kalsium, fosfor dan vitamin D untuk tulang yang sehat.
            </Text>
          </Stack>

          <HStack
            spacing={10}
            align="center"
            direction="row"
            justify="center"
            width="full"
          >
            <HStack align="center" justify="center">
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={decrement}
              >
                -
              </Button>
              <Input
                maxW="50px"
                textAlign="center"
                type="number"
                autoCorrect='off'
                autocapitalize="off"
                name="cantidad"
                value={cantidad}
                id=""
              />
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={increment}
              >
                +
              </Button>
            </HStack>
            <Button colorScheme="primary" variant="solid" size="lg">
              Add to cart
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default ProductDetail
