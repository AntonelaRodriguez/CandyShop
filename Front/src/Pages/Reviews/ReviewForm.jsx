
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails, postReview } from '../../redux/actions/actions';   



const ReviewForm = (props) => {
  const dispatch = useDispatch();
  // const userDetail = useSelector((state) => {state.userDetails})
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
      rating: null,
    })
    alert("Review posted successfully")
  }

  return (
    <Stack direction='row' align='center' justify='center' gap={15}>
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
            placeholder="Rating" 
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
    </Stack>
  )
}

export default ReviewForm;