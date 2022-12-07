import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CardProduct = ({ image, index }) => {
  console.log(index)
  return (
    <Link to={`/product/${index}`}>
      <Card bg="gray.100" maxW="sm" minH="full">
        <CardBody>
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" bg="primary.100">
              Buy now
            </Button>
            <Button variant="ghost" bg="primary.300">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default CardProduct
{
  /* <GridItem>
<Image width="250px" src={i} />
</GridItem> */
}
