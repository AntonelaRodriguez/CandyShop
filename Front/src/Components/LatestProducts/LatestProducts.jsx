import React, { useEffect } from 'react'
import { Button, Grid, GridItem, Heading, Image, Stack } from '@chakra-ui/react'
import CardProduct from '../CardProduct/CardProduct'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const LatestProducts = () => {
  let products = useSelector((state) => state.products)
  products = products.slice(0, 3)
  useEffect(() => {
    return () => {
      window.scroll(0, 0)
    }
  }, [])
  return (
    <Stack
      boxShadow='base'
      w='full'
      minW='full'
      py={20}
      gap={3}
      justify='center'
      align='center'
      overflow='hidden'
    >
      <Heading as='h2' fontWeight={700} textColor='primary.300'>
        Our Latest Products
      </Heading>
      <Grid
        py={20}
        gridTemplateColumns={{
          sm: 'repeat(1,1fr)',
          md: 'repeat(2,1fr)',
          lg: 'repeat(3,1fr)'
        }}
        gap={20}
        minW='full'
        w='full'
      >
        {products.map((product) => {
          return (
            <GridItem w='full' h='full' key={product.id}>
              <CardProduct
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                description={product.description}
                stock={product.stock}
                availability={product.availability}
              />
            </GridItem>
          )
        })}
      </Grid>

      <Button colorScheme='primary' size='lg' w='fit-content' px={20}>
        <Link to='/products'> View More</Link>
      </Button>
    </Stack>
  )
}

export default LatestProducts
