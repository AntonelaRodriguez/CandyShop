import React from "react";
import { useRef } from 'react';
import { BiMailSend } from "react-icons/bi";
import emailjs from '@emailjs/browser';
import {
    Container,
    Link,
    SimpleGrid,
    Stack,
    Heading,
    Text,
    Input,
    IconButton,
    useColorModeValue,
    Textarea,
  } from "@chakra-ui/react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLocalStorage } from "../../Components/useLocalStorage/useLocalStorage";

const ContactUs = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_sdiq8ha', 'template_p4byrfe', form.current, 'cFTVIeO15aAImKxlv')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
  };

  const [name, setName] = useLocalStorage('name', '');
  const [email, setEmail] = useLocalStorage('email', '');
  const [text, setText] = useLocalStorage('text', '');

  function validate(email) {
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return validation
  };

  function validateName(name) {
    const validation = /^\s+|\s+$/.test(name);
    return validation
  };

  function validateText(text) {
    const validation = /^\s+|\s+$/.test(text);
    return validation
  };

    return(
    <Stack width='full' spacing={5} h='full' justifyContent='space-between' flexDirection='column'>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns="repeat(2, 1fr)" spacing={8}>
          <Stack align={'center'}>
            <Heading fontWeight={700} fontSize='4xl' m={'1rem'} mb={'1rem'}> Contact Us: </Heading>
            <Stack flexDirection={'row'}>
              <Text fontSize='2xl' color={'tomato'} m={'0.8rem'}><FaWhatsapp/></Text>
              <Text fontSize='xl'><Link href="https://api.whatsapp.com/send/?phone=5491163714762">Whatsapp</Link></Text>
            </Stack>
            <Stack flexDirection={'row'}>
              <Text fontSize='2xl' color={'tomato'} m={'0.8rem'}><FaInstagram/></Text>
              <Text fontSize='xl'><Link href="https://www.instagram.com/">Instagram</Link></Text>
            </Stack>
          </Stack>
          <Stack align={'flex-start'} m={'1rem'}>
            <Heading fontWeight={700} size="md" m={'0.2rem'}> Send us a message: </Heading>
              <Stack direction={"column"}>
              <form ref={form} onSubmit={sendEmail}>
              <Input
                maxLength={'23'}
                m={'1rem'}
                required
                isInvalid={validateName(name)}
                  value={name}
                  onChange={e=> setName(e.target.value)}
                  placeholder={"Your full name..."}
                  name='name'
                  type='text'
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border='1px solid #F6ACA3'
                  mb={2}
                  _focus={{
                    bg: "whiteAlpha.300",
                    border: "4px solid #F6ACA3",
                  }}
                />
                <Input
                  maxLength={'50'}
                  value={email}
                  onChange={e=> setEmail(e.target.value)}
                  m={'1rem'}
                  required
                  name='email'
                  type='email'
                  placeholder={"Your email address..."}
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border='1px solid #F6ACA3'
                  mb={2}
                  _focus={{
                    bg: "whiteAlpha.300",
                    border: "4px solid #F6ACA3",
                  }}
                />
                <Textarea
                  maxLength={'200'}
                  isInvalid={validateText(text)}
                  value={text}
                  onChange={e=> setText(e.target.value)}
                  m={'1rem'}
                  required
                  placeholder={"Your message..."}
                  name='message'
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border='1px solid #F6ACA3'
                  mb={2}
                  _focus={{
                    bg: "whiteAlpha.300",
                    border: "4px solid #F6ACA3",
                  }}
                />
                <IconButton
                  m={'1rem'}
                  size={'lg'}
                  type='submit'
                  bg={"primary.300"}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "white",
                    color: "primary.300",
                    border: "1px solid #F6ACA3"
                  }}
                  icon={<BiMailSend />}
                  disabled={!validate(email) || !name.length || validateName(name) || validateText(text) || !text.length}
                />
              </form>
              </Stack>
              </Stack>
        </SimpleGrid>
      </Container>
    </Stack>    
    );
};

export default ContactUs;