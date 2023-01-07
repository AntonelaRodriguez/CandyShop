import React from 'react'
import { Box, Flex, Text, Button, Stack, Icon, Image, Avatar } from '@chakra-ui/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import img from '../../assets/candy_logo.svg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { postUser, getUserCart, postCart, getUser } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from '../useLocalStorage/useLocalStorage'

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
import { useAuth0 } from '@auth0/auth0-react'
import { TbCandy } from 'react-icons/tb'
import { TfiPanel } from 'react-icons/tfi'
import { FaStore } from 'react-icons/fa'
import { MdOutlineRequestPage } from 'react-icons/md'

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
    <Stack
      justifyContent='flex-start'
      alignItems='center'
      display={{ base: 'flex', md: 'none' }}
      direction='row'
      onClick={toggle}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Stack>
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
  const dispatch = useDispatch()
  const userCarts = useSelector((state) => state.userCart)
  const usuario = useSelector((state) => state.user)
  // console.log(usuario)

  //auth0
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()
  const history = useNavigate()
  const location = useLocation()
  return (
    <Box width='100%' display={{ base: isOpen ? 'block' : 'none', md: 'block' }}>
      <Stack
        spacing={8}
        align='center'
        justify={['space-between', 'space-between', 'space-between', 'space-between']}
        direction={['column', 'row', 'row', 'row']}
        pt={{ base: 10, md: 0 }}
      >
        {/* candy */}
        <Flex direction='row' align='center' justifyContent='center' display='flex'>
          <Link to='/'>
            <Flex
              color={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
              direction='row'
              gap={{ base: 5, md: 2 }}
              align='center'
              justifyContent='center'
              display='flex'
            >
              <Icon h={6} w={6} as={TbCandy} />
              Candy
            </Flex>
          </Link>
        </Flex>
        {/* demas cosas */}

        <Flex
          direction={{ base: 'column', sm: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='space-between'
          gap={15}
        >
          {/* location.pathname !== "/products" && */}
          <Link to='/products'>
            <Flex
              color={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
              direction='row'
              gap={{ base: 5, md: 2 }}
              align='center'
              justifyContent='center'
              display='flex'
            >
              <Icon h={6} w={6} as={FaStore} _hover={{ color: 'primary.300' }} />
              <Text fontWeight='600' _hover={{ color: 'primary.300' }}>
                Store
              </Text>
            </Flex>
          </Link>
          {usuario?.admin && (
            <Link to='/admin'>
              <Flex
                color={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
                direction='row'
                gap={{ base: 5, md: 2 }}
                align='center'
                justifyContent='center'
                display='flex'
              >
                <Icon h={6} w={6} as={TfiPanel} _hover={{ color: 'primary.300' }} />
                <Text fontWeight='600' _hover={{ color: 'primary.300' }}>
                  Admin Panel
                </Text>
              </Flex>
            </Link>
          )}
          {isAuthenticated && !usuario?.admin && (
            <Link to='/UserShopping'>
              <Flex
                color={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
                direction='row'
                gap={{ base: 5, md: 2 }}
                align='center'
                justifyContent='center'
                display='flex'
              >
                <Icon _hover={{ color: 'primary.300' }} h={6} w={6} as={MdOutlineRequestPage} />
                <Text fontWeight='600' _hover={{ color: 'primary.300' }}>
                  My Orders
                </Text>
              </Flex>
            </Link>
          )}
          {usuario.admin !== true && (
            <Link to='/cart'>
              <Flex
                color={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
                direction='row'
                gap={{ base: 5, md: 2 }}
                align='center'
                justifyContent='center'
                display='flex'
              >
                <Icon
                  boxSize={7}
                  as={AiOutlineShoppingCart}
                  _hover={{ color: 'primary.300' }}
                  color={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
                />
              </Flex>
            </Link>
          )}
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <Button w='2em' borderRadius='2em'>
                  <Avatar name={user.name} boxSize='2em' src={user.picture} />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent
                  boxShadow='2xl'
                  p='6'
                  rounded='md'
                  bg='white'
                  _hover={{ color: '#000' }}
                >
                  <PopoverHeader borderColor='primary.600'>
                    <PopoverArrow />
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
                      <Text fontSize='1.7em' fontWeight='600' textTransform='capitalize'>
                        {user.given_name}
                      </Text>
                      <Text color='gray.600'>{user.email}</Text>
                    </Flex>
                  </PopoverHeader>
                  <PopoverBody align='center' justifyContent='center' display='flex'>
                    <Link to='/userDetails'>
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
                    >
                      {' '}
                      Log Out
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          ) : (
            <Button
              colorScheme='black'
              variant='outline'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              w='6.5em'
              onClick={() => loginWithRedirect()}
              textColor={{ base: 'whiteAlpha.900', md: 'blackAlpha.900' }}
              _hover={{ color: 'primary.300' }}
            >
              Log In
              <Icon boxSize={6} as={HiOutlineUserCircle} />
            </Button>
          )}
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
      justify={{ base: 'flex-start', md: 'center' }}
      wrap='wrap'
      w='100%'
      py={6}
      px={{ base: 5, md: 0 }}
      bg={['blackAlpha.900', 'blackAlpha.900', 'transparent', 'transparent']}
      color={['whiteAlpha.900', 'whiteAlpha.900', 'primary.700', 'primary.700']}
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
