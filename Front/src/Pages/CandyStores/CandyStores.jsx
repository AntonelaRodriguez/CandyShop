import React from "react";
import {
    Container,
    Flex,
    Box,
    Link,
    SimpleGrid,
    Stack,
    Heading,
    Text,
    Input,
    IconButton,
    useColorModeValue,
    Textarea,
    AspectRatio 
  } from "@chakra-ui/react";
  import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const CandyStores = () => {
    return(
        <Flex as="nav" align="center" justify="center" wrap="wrap" py={6} w="full">
            <Box
        w="full"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        borderRadius="md"
        height="full"
        margin="auto"
        border='1px solid #F6ACA3'
        boxShadow="xl"
            >
        <Container direction='column' align='center' justify='center'>
            <Heading color={'tomato'} fontWeight={700} fontSize='4xl' m={'1rem'} mb={'2rem'} mt={'2rem'}> Our Candy Stores: </Heading>
            <Text fontSize='2xl' m={'1rem'}>We have stores all over the country.</Text>
            <Text fontSize='2xl' m={'1rem'} mb={'2rem'}>Take a look and come to vist someday!</Text>
            <AspectRatio ratio={19 / 12} border='7px solid #F6ACA3' borderRadius="md" boxShadow="2xl">
                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3473988.218606696!2d-65.30681522998098!3d-28.928753403277007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sarcor%20tienda%20de%20golosinas!5e0!3m2!1ses-419!2sar!4v1673283016828!5m2!1ses-419!2sar">
                </iframe>
            </AspectRatio>
            <Text color={'tomato'} fontSize='2xl' m={'1rem'} mt={'2rem'} mb={'2rem'}>All our products are available in stores too!</Text>
        </Container>
            </Box>
        </Flex>
    )
};

export default CandyStores;
