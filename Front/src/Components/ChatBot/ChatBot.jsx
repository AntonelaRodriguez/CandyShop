import React, { useState } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  HStack,
  Icon,
  Input,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { BsChatDotsFill } from 'react-icons/bs'
import axios from 'axios'

const ChatBot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [messages, setMessages] = useState([
    {
      response: '',
      from: '',
      meMessage: ''
    }
  ])

  const [input, setInput] = useState('')

  const sendMessage = async (message) => {
    const url = 'http://localhost:3001/chatbot/send'
    const res = await axios.post(url, { message })
    setMessages([
      ...messages,
      {
        response: res.data.response,
        from: 'me',
        meMessage: res.data.meMesssage
      }
    ])
  }

  let mensajes = messages.slice(1)

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
    setInput('')
  }

  return (
    <Stack position='fixed' maxH='full' bottom={0} p={10} right={0}>
      <Icon w={8} h={8} color='primary.300' as={BsChatDotsFill} onClick={onOpen} cursor='pointer' />
      <Drawer placement='right' onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent w='full' overflow='hidden' h='full' bg='gray.800'>
          <DrawerHeader color='whiteAlpha.900'>ChatBot</DrawerHeader>
          <DrawerBody w='full' p={10} overflow='hidden'>
            <VStack overflowY='scroll' h='full' p={10} align='center' justify='center' w='full'>
              {mensajes?.map((message, i) => {
                return (
                  <List
                    bg='gray.500'
                    key={i}
                    p={5}
                    display='flex'
                    flexDirection='column'
                    gap={3}
                    w='full'
                    alignItems={`${message.from == 'me' ? 'flex-end' : 'flex-start'}`}
                    justifyContent={`${message.from == 'me' ? 'flex-end' : 'flex-start'}`}
                  >
                    <HStack
                      w='full'
                      direction='row'
                      align='center'
                      justifyContent={`${message.from == 'me' ? 'flex-end' : 'flex-start'}`}
                    >
                      <Text color='green.100' display='block'>
                        {message.from === 'me' && '😋'}
                      </Text>

                      <ListItem
                        display='block'
                        color={`${message.from == 'me' ? 'green.300' : 'whiteAlpha.900'}`}
                      >
                        {message.meMessage}
                      </ListItem>
                    </HStack>

                    <HStack
                      direction='row'
                      align='center'
                      w='full'
                      justifyContent={`${message.from == 'me' ? 'flex-end' : 'flex-start'}`}
                    >
                      <Text color='green.100' display='block'>
                        {message.from === 'me' && '🤖'}
                      </Text>

                      <ListItem w='full' display='block' color='whiteAlpha.900'>
                        {message.response}
                      </ListItem>
                    </HStack>
                  </List>
                )
              })}
            </VStack>
            <form onSubmit={handleSubmit}>
              <FormControl
                display='flex'
                gap={5}
                alignItems='center'
                justifyContent='center'
                w='full'
              >
                <Input
                  placeholder='Mensaje'
                  w='full'
                  color='whiteAlpha.900'
                  _placeholder={{ color: '#whiteAlpha.500' }}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <Button colorScheme='blue' variant='solid' size='md' type='submit'>
                  Enviar
                </Button>
              </FormControl>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}

export default ChatBot
