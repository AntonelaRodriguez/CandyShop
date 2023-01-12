
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getReviews, getProductDetails, postReview } from '../../redux/actions/actions';   




const ReviewForm = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();
  const { id } = useParams();
  const currentUser = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])
  const [input, setInput] = useState({
    productId: "",
    email: "",
    author: "",
    title: "",
    description: "", 
    rating: null,
  });
  const newReview = {
    productId: id,
    email: isAuthenticated ? user.email : "",
    author: isAuthenticated ? user.name : "",
    title: input.title,
    description: input.description, 
    rating: input.rating,
  }

  function handleChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(postReview(newReview))
    setInput({
      title: "",
      description: "", 
      rating: "",
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Review was submitted succesfully!',
      showConfirmButton: false,
      timer: 1000
    })
    dispatch(getReviews(id))
  }
  if(isAuthenticated && currentUser.admin === false){
    return (
      <Flex
        direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
        justifyContent='space-around'
        borderRadius='md'
        height='full'
        w="25rem"
        position='relative'
        marginRight='2rem'
      >
        <Stack marginTop='3rem' direction='column' align='center' justify='center'>
          <form action='submit' onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing='2' w='24rem' alignItems='center'>  {/* aca se puede modificar para hacerlo mas ancho al form */}
              <Heading  marginBottom='2rem'>
              Leave a Review
              </Heading>
              <FormControl isRequired>
              <FormLabel>Title</FormLabel>
                <Input 
                type="text"
                value={input.title}
                name="title"
                onChange={handleChange}
                marginBottom='2rem'
                />

              <FormLabel>Description</FormLabel>
                <Textarea 
                placeholder='Description...'
                value={input.description}
                name="description"
                onChange={handleChange}
                marginBottom='2rem'
                maxLength='150ch'
                />

                <FormLabel>Rating</FormLabel>
                <Select 
                placeholder="..." 
                value={input.rating}
                name="rating"
                onChange={handleChange}
                marginBottom='2rem'
                // width='25rem'
                >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="primary" w='fit-content'>
                Submit review
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    )
  }
}

export default ReviewForm;