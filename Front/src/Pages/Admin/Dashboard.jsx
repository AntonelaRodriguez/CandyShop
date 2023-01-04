import { Container, Stack, Stat } from '@chakra-ui/react';
import React from 'react';
import Chart from './src/Dashboard/ChartTest';
import Statistics from './src/Dashboard/Stats';
import LineChart from './src/Dashboard/ChartOrders';

const DashBoard = () => {
  return (
    <Container marginBottom={10} align={'center'}>
      <Stack
        w='100%'
        marginBottom={'8'}
        borderWidth={2}
        borderColor={'gray.200'}
        borderRadius={'10'}
      >
        <Statistics />
      </Stack>
      <Stack
        borderWidth={2}
        borderColor={'gray.200'}
        w='100%'
        borderRadius={'10'}
        marginBottom={'8'}
        padding={4}
      >
        <h1>Sold Products per Category</h1>
        <Chart />
      </Stack>
      <Stack
        borderWidth={2}
        borderColor={'gray.200'}
        w='100%'
        borderRadius={'10'}
        marginBottom={'8'}
      >
        <LineChart />
      </Stack>
    </Container>
  );
};

export default DashBoard;
