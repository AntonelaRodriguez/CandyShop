import React from 'react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';

const Statistics = () => {
  return (
    <Stat>
      <StatLabel>Collected Fees</StatLabel>
      <StatNumber>$47421.80</StatNumber>
      <StatHelpText>January 1 - Feb 28</StatHelpText>
    </Stat>
  );
};

export default Statistics;
