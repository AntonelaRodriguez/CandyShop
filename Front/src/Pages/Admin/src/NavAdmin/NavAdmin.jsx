import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { FiHome, FiCompass, FiStar, FiSettings, FiMenu } from 'react-icons/fi';
import { TfiPanel } from 'react-icons/tfi';
import { FaUsersCog, FaCandyCane, FaShippingFast, FaPencilAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const LinkItems = [
  { name: 'Admin', icon: TfiPanel, source: '/admin' },
  { name: 'Users', icon: FaUsersCog, source: '/admin/UsersAdmin' },
  { name: 'Products', icon: FaCandyCane, source: '/admin/ProductsAdmin' },
  { name: 'Orders', icon: FaShippingFast, source: '/admin/OrdersAdmin' },
  { name: 'Create', icon: FaPencilAlt, source: '/create' },
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', lg: 'flex' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='md'
      >
        <DrawerContent
          p={35}
          w='full'
          h='full'
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <IconButton
            variant='outline'
            onClick={onClose}
            aria-label='open menu'
            icon={<AiOutlineClose />}
          />
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', lg: 'none' }} onOpen={onOpen} />
    </>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Stack
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w='full'
      direction='column'
      align='center'
      justifyContent='center'
      position={{ base: 'unset', sm: 'unset', lg: 'fixed' }}
      top={{ base: '20', lg: '50%' }}
      transform={{ base: 'translate(-45%, -50%)', lg: 'translate(-45%, -42%)' }}
      {...rest}
    >
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} source={link.source}>
          {link.name}
        </NavItem>
      ))}
    </Stack>
  );
};

const NavItem = ({ source, icon, children, ...rest }) => {
  return (
    <Link to={source}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'primary.500',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      height='full'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton variant='outline' onClick={onOpen} aria-label='open menu' icon={<FiMenu />} />
    </Flex>
  );
};
