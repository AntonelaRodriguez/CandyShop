
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getReviews, getProductDetails, postReview } from '../../redux/actions/actions';   




const ReviewForm = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();
  const { id } = useParams();
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
    alert("Review posted successfully")
    dispatch(getReviews(id))
  }

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
      <Stack direction='column' align='center' justify='center' gap={15}>
        <Heading >
        Leave a Review
        </Heading>
        <form action='submit' onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={2}>
            <FormControl isRequired>
            <FormLabel>Title</FormLabel>
              <Input 
              type="text"
              value={input.title}
              name="title"
              onChange={handleChange}
              />

            <FormLabel>Description</FormLabel>
              <Textarea 
              placeholder='Description...'
              value={input.description}
              name="description"
              onChange={handleChange}
              />

              <FormLabel>Rating</FormLabel>
              <Select 
              placeholder="..." 
              value={input.rating}
              name="rating"
              onChange={handleChange}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="primary">
              Submit review
            </Button>
          </Stack>
        </form>
        <Link to={`/reviews/${id}`}>View more</Link>
      </Stack>
    </Flex>
  )
}

export default ReviewForm;