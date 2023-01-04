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
      window.scroll(0, 0);
    }
  },[])
  return (
    <>
      <Stack gap={3} justify='center' align='center' overflow='hidden'>
        <Heading as={'h2'}>Our Latest Products</Heading>
        <Grid
          p={20}
          gridTemplateColumns={{
            sm: 'repeat(1,1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(3,1fr)'
          }}
          gap={20}
          minW='full'
        >
          {products.map((product) => {
            return (
              <GridItem key={product.id}>
                <CardProduct
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  stock={product.stock}
                  availability= {product.availability}
                />
              </GridItem>
            )
          })}
        </Grid>

        <Button colorScheme='primary' size='lg'>
          <Link to='/products'> View More</Link>
        </Button>
      </Stack>
    </>
  )
}

export default LatestProducts
