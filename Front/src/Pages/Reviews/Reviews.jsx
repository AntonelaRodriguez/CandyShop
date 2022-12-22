import { Flex, FormControl, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';



const Reviews = () => {


  return (
    <Stack direction='row' align='center' justify='center' gap={15}>
      <Heading >

      Leave a Review
      </Heading>
      <form action='submit' onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2}>
          <FormControl isRequired></FormControl>
        </Stack>
      </form>
    </Stack>
  )
}

export default Reviews;