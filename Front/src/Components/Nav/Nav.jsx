import React from 'react'
import { Box, Flex, Text, Button, Stack, Icon, Image, Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import img from '../../assets/candy_logo.svg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { HiOutlineUserCircle } from "react-icons/hi";
import { postUser } from '../../redux/actions/actions'
import {useDispatch} from "react-redux"


import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal
} from '@chakra-ui/react'


//auth0 
import {useAuth0} from "@auth0/auth0-react"


const Nav = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

const CloseIcon = () => (
  <svg width='24' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
    <title>Close</title>
    <path
      fill='white'
      d='M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z'
    />
  </svg>
)

const MenuIcon = () => (
  <svg width='24px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='white'>
    <title>Menu</title>
    <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
  </svg>
)

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Link href={to}>
      <Text display='block' {...rest}>
        {children}
      </Text>
    </Link>
  )
}

const MenuLinks = ({ isOpen }) => {
 
  
  const dispatch = useDispatch();

  //auth0
  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();
  console.log(user)
   
  let infoUser = {}

 if(isAuthenticated){ 

   if(user.email === "lala@gmail.com"){
    infoUser = {
      email: user.email,
      admin: true
    } 
   }else{
     infoUser = {
      email: user.email ,
      admin: false
     }
   }
  
  dispatch(postUser(infoUser));
}



console.log(infoUser)

  return (
    <Box
      width='100%'
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'center', 'space-between']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Flex direction='row' align='center' justifyContent='center' display='flex'>
          <Link to='/'>
            <Flex
              color='blackAlpha.900'
              direction='row'
              gap={5}
              align='center'
              justifyContent='center'
              display='flex'
            >
              <img src={img} />
              Candy
            </Flex>
          </Link>
        </Flex>
        <Flex align='center' justifyContent='space-between' gap={5}>
          <Button
            _hover={{
              color: '#000'
            }}
            colorScheme='primary'
            variant='outline'
          >
            <Link to='/products'>Store of products</Link>
          </Button>

          {/* <Button
            _hover={{
              color: '#000'
            }}
            colorScheme='primary'
            variant='outline'
          >
            <Link to='/signin'>Sign In</Link>
          </Button>

          <Button
            _hover={{
              color: '#000'
            }}
            colorScheme='primary'
            variant='outline'
          >
            <Link to='/signup'>Sign Up</Link>
          </Button> */}

          <Button
            _hover={{
              color: '#000'
            }}
            colorScheme='primary'
            variant='outline'
          >
            <Link to='/create'>Create</Link>
          </Button>
        </Flex>


        <Flex align='center' justifyContent='space-between' gap={5}>
          {
            isAuthenticated 
            ? 
              <Popover >
                <PopoverTrigger>
                  <Button w='2em' borderRadius="2em">                  
                    <Avatar name={user.name} boxSize='2em' src={user.picture} />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent 
                    boxShadow='2xl' 
                    p='6' 
                    rounded='md' 
                    bg='white'
                    _hover={{ color: '#000'}}
                  >
                    <PopoverHeader borderColor='primary.600'>
                      <PopoverArrow/>
                      <Flex
                        direction='column'
                        mt='1em'
                        mb='1em'
                        gap={3}
                        align='center'
                        justifyContent='center'
                        display='flex'
                      >
                        <Avatar name={user.name} size='xl' src={user.picture} />
                        <Text fontSize='1.7em' fontWeight='600' textTransform='capitalize'>{user.given_name}</Text>
                        <Text color='gray.600'>{user.email}</Text>
                      </Flex>

                    </PopoverHeader>
                    <PopoverBody                
                      align='center'
                      justifyContent='center'
                      display='flex'
                    >
                      <Link to="/userDetails">

                      <Button
                      mt='1em'
                      _hover={{ color: '#000' }} 
                      colorScheme='primary' 
                      variant='outline'
                      h='2em'
                      marginRight='5px'
                      >
                        Edit Account
                      </Button>
                      </Link>
                      <Button 
                        mt='1em'
                        _hover={{ color: '#000' }} 
                        colorScheme='primary' 
                        variant='outline'
                        h='2em'
                        onClick={() => logout({ returnTo: window.location.origin })}
                      > Log Out
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            : <Button 
                _hover={{ color: '#000' }} 
                colorScheme='primary' 
                variant='outline'
                display='flex'
                alignItems='center'
                justifyContent="space-between"
                w='6.5em'
                onClick={() => loginWithRedirect() }
              > 
                Log In  
                <Icon boxSize={6} as={HiOutlineUserCircle} />
              </Button>
          }

       
          <Button
            colorScheme='primary'
            display='flex'
            alignItems='center'
            justifyContent='center'
            variant="outline"
            _hover={{
              color: '#000'
            }}
          >
            <Link to='/cart'>
              <Icon boxSize={6} as={AiOutlineShoppingCart} />
            </Link>
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='center'
      wrap='wrap'
      w='100%'
      py={6}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Nav

/* import React from 'react'

const Nav = () => {
  return (
    <div>Nav</div>
  )
}

export default Nav */
