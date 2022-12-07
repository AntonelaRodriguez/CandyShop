import React from 'react'
import { Button, Grid, GridItem, Heading, Image, Stack } from '@chakra-ui/react'
import CardProduct from '../CardProduct/CardProduct'
import { Link, NavLink } from 'react-router-dom'
const LatestProducts = () => {
  let images = [
    'https://www.brachs.com/sites/default/files/2022-09/00041420046919_A1C1.png',
    'https://s7d2.scene7.com/is/image/hersheysassets/0_34000_56046_2_701_56046_015_Item_Front?fmt=webp-alpha&hei=908&qlt=75',
    'https://s7d2.scene7.com/is/image/hersheysassets/0_34000_56043_1_701_56043_018_Item_Front?fmt=png-alpha&hei=412',
    'https://dulcilandia.com.ar/par/wp-content/uploads/sites/4/2020/04/04950085.png',
    'https://www.brachs.com/sites/default/files/2022-09/00041420046919_A1C1.png',
    'https://www.brachs.com/sites/default/files/2022-09/00041420046919_A1C1.png'
  ]
  return (
    <>
      <Stack gap={3} justify="center" align="center" overflow="hidden">
        <Heading as={'h2'}>Our Latest Products</Heading>
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

        <Button
          color="whiteAlpha.800"
          as={'a'}
          bg="primary.300"
          w="196px"
          size="lg"
        >
          <Link to="/products">View More</Link>
        </Button>
      </Stack>
    </>
  )
}

export default LatestProducts
