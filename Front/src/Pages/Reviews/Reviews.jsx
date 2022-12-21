import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';



const Reviews = () => {


  return (
    <Flex 
      w='full'
      direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
      justifyContent='space-between'
      borderRadius='md'
      height='full'
      margin='auto'
      boxShadow='2xl'
      position='relative'
      >
        <Heading
        borderStartRadius='md'
        
        minHeight='full'
        bg='#E3E5FA'
        align='center'
        justify='center'
        position='relative'
        p={5}
        >
          Soy el Review
        </Heading>
    </Flex>
  )
}

export default Reviews;