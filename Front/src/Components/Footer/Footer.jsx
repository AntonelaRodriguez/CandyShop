import {useEffect, useState} from 'react';
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
  ModalFooter
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaMailBulk, FaWhatsapp } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import img from "../../assets/candy_logo.svg";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useDispatch } from 'react-redux';
import { getAllUsers, newSubscription, updateUser} from '../../redux/actions/actions';
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';

const ListHeader = ({ children }) => {
  return (
    <Text color='tomato' fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {

  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth0()
  const [email, setEmail] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  
  const newDetail = {
    email: email,
    subscribed: true
  }
  function handleChange(e) {
    setEmail(e.target.value);
    validate(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You are now subscribed! Check spam inbox',
          showConfirmButton: false,
          timer: 3000
      })
      dispatch(updateUser(newDetail))
      dispatch(newSubscription(email))
      setEmail('')  
  }

  function validate(email) {
    const validation = /\S+@\S+\.\S+/.test(email)
    return validation
  }

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
        border='1px solid #F6ACA3'
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid templateColumns="repeat(3, 1fr)" spacing={8} columns={[1, null, 3]}>
            <Stack spacing={8}>
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
                  bg: "white",
                  color: "primary.300",
                  border: "1px solid #F6ACA3"
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
                  bg: "white",
                  color: "primary.300",
                  border: "1px solid #F6ACA3"
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
                  bg: "white",
                  color: "primary.300",
                  border: "1px solid #F6ACA3"
              }}>
                <FaInstagram />
              </chakra.button>
              </Stack>
            </Stack>
            <Stack align={'center'}>
              <ListHeader>Support</ListHeader>
              <Link to='/contactUs'>
                <Text
                cursor={'pointer'}
                transition={'background 0.3s ease'}
                _hover={{
                  color: "primary.300",
              }}
                >Contact us</Text>
              </Link>
              <Link to='/howToBuy'>
                <Text
                cursor={'pointer'}
                transition={'background 0.3s ease'}
                _hover={{
                  color: "primary.300",
                }}
                >How to buy
                </Text>
              </Link>
              <Link to='/candyStores'>
                <Text
                cursor={'pointer'}
                transition={'background 0.3s ease'}
                _hover={{
                  color: "primary.300",
                }}
                >Our Candy Stores
                </Text>
              </Link>
            </Stack>
            <Flex alignItems='center' justifyContent={'center'}>
              <Stack>
                { isAuthenticated ? <> 
                  <Button onClick={onOpen} bg={"primary.300"} color={useColorModeValue("white", "gray.800")}>Subscribe</Button>
                  <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader bg={"primary.300"} color={useColorModeValue("white", "gray.800")}>Subscribe to our Newsletter!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input type='email'  name='subscribe' placeholder='Type your email...' value={email} onChange={handleChange} />
                    </ModalBody>
                    <ModalFooter>
                      <Button bg={"primary.300"} color={useColorModeValue("white", "gray.800")} mr={3} type='submit' onClick={(e) => handleSubmit(e)} onClickCapture={onClose} disabled={!email.length || !validate(email)}>
                      Submit
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
                  </Modal>
                </> : <Button onClick={onOpen} bg={"primary.300"} color={useColorModeValue("white", "gray.800")}>Log in to Subscribe</Button> }
              </Stack>
            </Flex>
            
          </SimpleGrid>
        </Container>
        
      </Box>
    </Flex>
  );
}
