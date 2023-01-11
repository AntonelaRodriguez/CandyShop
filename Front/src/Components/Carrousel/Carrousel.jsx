import {
  Flex,
  Box,
  Image,
  Button,
  Text,
  HStack,
  Stack,
  Tag,
  TagLabel,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion, transform } from 'framer-motion';

const Carrousel = ({ brands }) => {
  console.log({ brands });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index) => (index + 1) % brands.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [brands, index]);

  return (
    <VStack
      w='full'
      h='auto'
      minW='full'
      borderRadius='lg'
      minH='full'
      p={15}
      align='center'
      gap={10}
      justifyContent='center'
    >
      <Stack align='start' justify='center'>
        <Heading textTransform='capitalize' as='h2' fontWeight={700} textColor='primary.300'>
          Brands we work with
        </Heading>
      </Stack>
      <HStack h='full' w='full' align='center'>
        {brands?.map((brand, i) => (
          <motion.div
            translate={{ translateX: 650 }}
           
            animate={{ translateX: -1300 }}
            exit={{ translateX: 0 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 1,
              type: 'keyframes',
            }}
          >
            <Tag size='lg' colorScheme='facebook'>
              <TagLabel textTransform='capitalize'>{brand}</TagLabel>
            </Tag>
          </motion.div>
        ))}
      </HStack>
    </VStack>
  );
};

export default Carrousel;
