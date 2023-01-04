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
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { IoIosSend } from 'react-icons/io'

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
      <Drawer placement='right' onClose={onClose} colorScheme='primary' isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent bg='primary.100'  w='full' h='full' minW='30%' maxH='full'>
          <Icon
            w={7}
            h={7}
            position='fixed'
            top={15}
            right={15}
            color='primary.300'
            as={AiOutlineClose}
            onClick={onClose}
            cursor='pointer'
          />
          <DrawerHeader textAlign='center' fontSize='3xl' color='blackAlpha.900'>
            ChatBot
          </DrawerHeader>
          <DrawerBody
            w='full'
            h='full'
            display='flex'
            flexDirection='column'
            gap={15}
            justifyContent='center'
            alignItems='center'
          >
            <VStack overflowY='scroll' h='full' align='center' justify='center' w='full'>
              {mensajes?.map((message, i) => {
                return (
                  <List
                    bg='primary.200'
                    key={i}
                    p={5}
                    display='flex'
                    flexDirection='column'
                    gap={3}
                    w='full'
                    alignItems='center'
                    justifyContent='center'
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
                        textTransform="capitalize"
                        color={`${message.from == 'me' ? 'gray.500' : 'blackAlpha.900'}`}
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

                      <ListItem w='full' display='block' color='blackAlpha.900'>
                        {message.response}
                      </ListItem>
                    </HStack>
                  </List>
                )
              })}
            </VStack>

            <HStack w='full' display='flex' direction='row' align='center' justify='space-between'>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                    border='1px'
                    borderColor='primary.300'
                    color='blackAlpha.900'
                    _placeholder={{ color: 'blackAlpha.900' }}
                    value={input}
                    focusBorderColor='primary.500'
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <Button colorScheme='primary' variant='outline' w='auto' type='submit'>
                    <Icon w='full' h={6} as={IoIosSend} cursor='pointer' />
                  </Button>
                </FormControl>
              </form>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}

export default ChatBot
