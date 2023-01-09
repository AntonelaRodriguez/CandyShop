import {useEffect, useState} from 'react';
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
  FormControl,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
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
import { useDispatch, useSelector } from 'react-redux';
import { changeSubscription, getAllUsers, newSubscription, updateUser} from '../../redux/actions/actions';
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';

const ListHeader = ({ children }) => {
  return (
    <Text color='tomato' fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {

  const dispatch = useDispatch()
  const { isAuthenticated, user } = useAuth0()
  const [email, setEmail] = useState("")
  const users = useSelector(state => state.users)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const currentUser = users && users.filter(u => u.email === email)
  
  console.log(email)
  console.log(user, 'usr')
  console.log(currentUser, 'current')
  const newDetail = {
    email: 'agubarrionuevox@gmail.com',
    subscribed: true
  }
  console.log(newDetail)
  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault()
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You are now subscribed!',
          showConfirmButton: false,
          timer: 2000
      })
      dispatch(updateUser(newDetail))
      dispatch(newSubscription(email))
      setEmail('')  
  }

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
          <SimpleGrid templateColumns="repeat(4, 1fr)" spacing={8}>
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
            <Stack align={'flex-start'}>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>Contact us</Link>
              <Link href={"#"}>Help Center</Link>
              <Link href={"#"}>Shipping</Link>
            </Stack>
            <Flex>
              <Stack>
                { isAuthenticated ? <> 
                  <Button onClick={onOpen} bg={"primary.300"} color={useColorModeValue("white", "gray.800")}>Subscribe</Button>
                  <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader bg={"primary.300"} color={useColorModeValue("white", "gray.800")}>Subscribe to our Newsletter!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                {/* <FormControl isRequired> */}
                        <Input  name='subscribe' placeholder='Type your email...' value={email} onChange={handleChange}/>
                {/* </FormControl> */}
                    </ModalBody>
                    <ModalFooter>
                      <Button bg={"primary.300"} color={useColorModeValue("white", "gray.800")} mr={3} type='submit' onClick={(e) => handleSubmit(e)} onClickCapture={onClose}>
                      Submit
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
                  </Modal>
                </> : <Button onClick={onOpen} bg={"primary.300"} color={useColorModeValue("white", "gray.800")}>Log in to Subscribe</Button> }
              </Stack>
            </Flex>
            <Stack align={'flex-start'}>
              <ListHeader>Get in Touch</ListHeader>
              <Stack direction={"column"}>
              <form ref={form} onSubmit={sendEmail}>
              <Input
                required
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
                  // onChange={(e) => setMail(e.target.value)}
                  // value = {mail}
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
                  type='submit'
                  bg={"primary.300"}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "white",
                    color: "primary.300",
                    border: "1px solid #F6ACA3"
                  }}
                  icon={<BiMailSend />}
                />
              </form>
              </Stack>

            </Stack>
          </SimpleGrid>
        </Container>
        
      </Box>
    </Flex>
  );
}
