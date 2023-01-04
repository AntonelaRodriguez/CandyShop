import {useState} from 'react';
import {useLocalStorage} from '../useLocalStorage/useLocalStorage'
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Flex,
  GridItem,
  Textarea,
  FormControl
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaMailBulk, FaWhatsapp } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import img from "../../assets/candy_logo.svg";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {

  // const [mail, setMail] = useLocalStorage('mail', '')

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_sdiq8ha', 'template_p4byrfe', form.current, 'cFTVIeO15aAImKxlv')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    console.log('submit')
  };

  return (
    <Flex as="nav" align="center" justify="center" wrap="wrap" py={6} w="full">
      <Box
        w="full"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        borderRadius="md"
        height="full"
        margin="auto"
        boxShadow="2xl"
        bg="gray.300"
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={8}>
            <Stack spacing={6}>
              <Box>
                <img src={img} />
              </Box>
              <Text fontSize={'sm'}>
                © 2022 CandyShop. All rights reserved
              </Text>
              <Stack direction={'row'} spacing={6}>
              <chakra.button
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                rounded={'full'}
                w={8}
                h={8}
                cursor={'pointer'}
                href="mailto:antonelabelenrodriguez@gmail.com" 
                target="_blank"
                as={'a'}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'background 0.3s ease'}
                _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
                <FaMailBulk />
              </chakra.button>
              <chakra.button
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                rounded={'full'}
                w={8}
                h={8}
                cursor={'pointer'}
                href="https://api.whatsapp.com/send/?phone=5491163714762" 
                target="_blank"
                as={'a'}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'background 0.3s ease'}
                _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
                <FaWhatsapp />
              </chakra.button>
              <chakra.button
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                rounded={'full'}
                w={8}
                h={8}
                cursor={'pointer'}
                href="https://www.instagram.com/" 
                target="_blank"
                as={'a'}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'background 0.3s ease'}
                _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
                <FaInstagram />
              </chakra.button>
              </Stack>
            </Stack>

            <GridItem align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Link href={"#"}>Contact us</Link>
            </GridItem>
            <GridItem>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>Help Center</Link>
            </GridItem>
            <GridItem align={"flex-start"}>
              <ListHeader>Get in Touch</ListHeader>
              <Stack direction={"column"}>
              <form ref={form} onSubmit={sendEmail}>
              <Input
                  placeholder={"Your name..."}
                  name='name'
                  type='text'
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <Input
                  // onChange={(e) => setMail(e.target.value)}
                  // value = {mail}
                  name='email'
                  type='email'
                  placeholder={"Your email address..."}
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <Textarea
                  placeholder={"Your message..."}
                  name='message'
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <IconButton
                  type='submit'
                  bg={useColorModeValue("primary.300", "green.800")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "green.600",
                  }}
                  icon={<BiMailSend />}
                />
              </form>
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </Flex>
  );
}
