import React from 'react'
import SimpleSidebar from './src/NavAdmin/NavAdmin'
import { useSelector } from 'react-redux'
import { Container, Spinner, Stack } from '@chakra-ui/react'
import CardProductAdmin from './CardProductAdmin/CardProductAdmin.jsx'
const ProductsAdmin = () => {
  let products = useSelector((state) => state.products)

  return (
    <Container
      maxW='container.lg'
      display='flex'
      justifyContent='center'
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <SimpleSidebar />
      <Stack w='full' h='full' gap={4} p={5}>
        {products.length ? (
          products.map((p, i) => {
            return (
              <CardProductAdmin
                key={p.id + i}
                name={p.name}
                description={p.description}
                image={p.image}
                id={p.id}
                price={p.price}
              />
            )
          })
        ) : (
          <Spinner size='xl' />
        )}
      </Stack>
    </Container>
  )
}

export default ProductsAdmin
