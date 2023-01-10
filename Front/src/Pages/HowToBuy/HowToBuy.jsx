import React from "react";
import {
    Box,
    chakra,
    Container,
    // Link,
    SimpleGrid,
    Stack,
    Text,
    Input,
    IconButton,
    useColorModeValue,
    Flex,
    Textarea,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Image,
    Center
  } from "@chakra-ui/react";
  import store from '../../assets/heroImage/shop.webp'
  import money from '../../assets/heroImage/money.png'
  import box from '../../assets/heroImage/box.png'

  const HowToBuy = () => {
    return(
    
    <Flex as="nav" align="center" justify="center" wrap="wrap" py={6} w="full">
        <Stack align={'center'} >
            <Text fontWeight={700} fontSize='4xl' m={'0.7rem'} >How To Buy?</Text>
            <Text fontSize='2xl' align={'center'}>Making a purchase at CandyStore is very simple. Follow these steps:</Text>
        </Stack>
      <Box
        w="full"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        borderRadius="md"
        height="full"
        margin="auto"
        border='1px solid #F6ACA3'
        mt={'1rem'}
      >
        <Container as={Stack} maxW={"6xl"} py={10} align='center' justify='center'>
          <SimpleGrid templateColumns="repeat(3, 1fr)" spacing={8}>
            <Stack align={'center'} m={'1rem'}>
                <Box color={'tomato'} boxSize='10rem'>
                    <img src={store} />
                </Box>
                <Text as='b' color={'tomato'} align={'center'} fontSize='xl'>Choose the products you are going to buy</Text>
                <Text align={'center'}>If you want more than one, add them to your cart.</Text>
            </Stack>
            <Stack align={'center'} m={'1rem'}>
                <Box boxSize='10rem'>
                    <img src={money} color='tomato'/>
                </Box>
                <Text as='b' color={'tomato'} align={'center'} fontSize='xl'>Pay with the payment method you wanty</Text>
                <Text align={'center'}>Buy safely: we use Mercado Pago technology.</Text>
            </Stack>
            <Stack align={'center'} m={'1rem'}>
                <Box boxSize='10rem'>
                    <img src={box} />
                </Box>
                <Text as='b' color={'tomato'} align={'center'} fontSize='xl'>And received the product you expect</Text>
                <Text align={'center'}>You can withdraw at our branches. And if the purchase is greater than $5000 we will send it to you by mail for free!</Text>
            </Stack>
          </SimpleGrid>
        </Container>
        
      </Box>
    </Flex>
    );
  };

  export default HowToBuy;