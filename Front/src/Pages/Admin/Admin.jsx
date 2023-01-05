import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  Box,
  Flex,
  Container,
} from '@chakra-ui/react';
import React from 'react';
import DashBoard from './Dashboard';
import SimpleSidebar from './src/NavAdmin/NavAdmin';

const Admin = () => {
  return (
    <>
      <SimpleSidebar marginRight='auto' />
      <DashBoard />
    </>
  );
};

export default Admin;
