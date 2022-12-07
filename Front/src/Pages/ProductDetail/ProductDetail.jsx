import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'

import stars from '../../assets/starsProductDetail/stars.svg'
import Taps from '../../Components/Taps/Taps'

const ProductDetail = () => {
  const [input, setInput] = useState('')
  const changeMonto = (e) => {
    setInput(e.target.value)
  }
  return (
    <Flex
      w="full"
      minHeight="650px"
      direction={{ base: 'column', md: 'row', lg: 'row' }}
      justifyContent="space-between"
      bg="gray.500"
      borderRadius="md"
    >
      <Stack
        borderStartRadius="md"
        width={{ base: '50%', sm: '100%' }}
        minHeight="full"
        bg="gray.300"
        align="center"
        justify="center"
      >
        <Box
          borderStartRadius="md"
          backgroundImage="https://s7d2.scene7.com/is/image/hersheysassets/0_34000_56046_2_701_56046_015_Item_Front?fmt=webp-alpha&hei=908&qlt=75"
          backgroundPosition="center center"
          backgroundRepeat="no-repeat"
          bgSize="contain"
          boxSize="md"
        ></Box>
      </Stack>
      <Stack minHeight="full" width={{ base: '50%', sm: '100%' }} bg="whiteAlpha.500" p={15}>
        <Flex
          
          minH={'full'}
          direction={{ base: 'column' }}
          align="flex-start"
          justifyContent="space-between"
          p={10}
        >
          <Heading as="h2" fontSize={48} fontWeight="bold">
            Product name
          </Heading>
          <Stack p={10} direction="row" align="center" justify="flex-start">
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
            <Taps
              title="Description"
              description="Makanan yang lengkap dan seimbang, dengan 41 nutrisi penting.
            Mengandung antioksidan (vitamin E dan selenium) untuk sistem
            kekebalan tubuh yang sehat. Mengandung serat untuk memperlancar
            pencernaan dan meningkatkan kesehatan usus. Diperkaya dengan
            kalsium, fosfor dan vitamin D untuk tulang yang sehat."
              title2="marca"
              description2="Cofler - Oblea - Ford"
              title3=""
            />
          </Stack>

          <HStack
            spacing={10}
            align="center"
            direction="row"
            justify="center"
            width="full"
          >
            <Stack direction="row" align="center" justify="center">
              <Text color="whiteAlpha.900" fontWeight="bold" fontSize={20}>
                Cantidad:
              </Text>
              <Select variant="filled" placeholder="Filled">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
            <Button size="lg" bg="primary.300">
              Add to cart
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default ProductDetail
