import React, { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Grid, 
  GridItem
} from '@chakra-ui/react'
import CardProduct from '../../Components/CardProduct/CardProduct'
import { Link } from 'react-router-dom'




const Products = () => {
  
  const [name, setName] = useState("")
  
  const handleChange = event => {
    setName (event.target.value)
  }
  console.log(name)
  
  const handleSumbit = (event) => {
    event.preventDefault()
    setName('')
    console.log('prueba')
  }


  let images = [
    'https://www.brachs.com/sites/default/files/2022-09/00041420046919_A1C1.png',
    'https://s7d2.scene7.com/is/image/hersheysassets/0_34000_56046_2_701_56046_015_Item_Front?fmt=webp-alpha&hei=908&qlt=75',
    'https://s7d2.scene7.com/is/image/hersheysassets/0_34000_56043_1_701_56043_018_Item_Front?fmt=png-alpha&hei=412',
    'https://dulcilandia.com.ar/par/wp-content/uploads/sites/4/2020/04/04950085.png',
    'https://www.brachs.com/sites/default/files/2022-09/00041420046919_A1C1.png',
    'https://www.brachs.com/sites/default/files/2022-09/00041420046919_A1C1.png'
  ]


  return (
  <Flex 
  direction='column'
  justifyContent="center"
  align="center">
  <Heading as={'h2'} p={10}>All Products</Heading>
  <form onSubmit={(event)=>handleSumbit(event)}>
    <Flex bg="primary.200" p={2} borderRadius={'md'} justifyContent='center' width='fit-content'>
    <Input
      paddingRight={2}
      paddingLeft={2}
      value={name}
      type="search"
      focusBorderColor='#ffffff78'
      // variant='unstyled'
      outline="none"
      border={'none'}
      _focus={{ outline: 'none', border: 'none' }}
      _placeholder={{ opacity: 1, color: 'white' }}
      name=""
      placeholder="Search..."
      id=""
      width='auto'
      onChange={handleChange}
    />
    <Button
      type='submit'
      variant="solid"
      _hover={{ backgroundColor: 'primary.400' }}
      color="whiteAlpha.900"
      bg={'primary.300'}
      >
      <img src="src\assets\magnifying_glass_search_logo.svg" width="15px" height="15px"/>
      </Button>
    </Flex>
  </form>

    <Stack gap={3} justify="center" align="center" overflow="hidden">
        <Grid
          p={20}
          gridTemplateColumns={{
            sm: 'repeat(1,1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(3,1fr)'
          }}
          gap={20}
          minW="full"
        >
          {images.map((i, index) => {
            return (
              <GridItem>
                <CardProduct key={i} index={index} image={i} />
              </GridItem>
            )
          })}
        </Grid>
      </Stack>
  </Flex>
  )
}

export default Products