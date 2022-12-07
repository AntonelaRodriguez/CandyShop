import React from 'react'
import { Box, Flex, Text, Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import img from '../../assets/candy_logo.svg'

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
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
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
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      width="100%"
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'center', 'space-between']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Flex
          direction="row"
          align="center"
          justifyContent="center"
          display="flex"
        >
          <Link to="/">
            <Flex
              color="blackAlpha.900"
              direction="row"
              gap={5}
              align="center"
              justifyContent="center"
              display="flex"
            >
              <img src={img} />
              Candy
            </Flex>
          </Link>
        </Flex>
        <Flex align="center" justifyContent="space-between" gap={20}>
          <Link to="/how">
            {' '}
            <Button colorScheme="primary" variant="outline">
              Account
            </Button>{' '}
          </Link>
          <Link to="/signin">
            {' '}
            <Button colorScheme="primary" variant="outline">
              Sign In{' '}
            </Button>
          </Link>
          <Link to="/signup">
            {' '}
            <Button colorScheme="primary" variant="outline">
              Sign Up{' '}
            </Button>
          </Link>
        </Flex>
        <Link to="/cart">
          <Button
            size="sm"
            rounded="md"
            color={['primary.200', 'primary.500', 'white', 'red.100']}
            bg={['white', 'white', 'primary.200', 'primary.300']}
            _hover={{
              bg: ['primary.300']
            }}
          >
            🛒
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
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
