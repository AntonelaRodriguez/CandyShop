import React, { useEffect } from 'react';
import { Button, Card, CardBody, Container, Flex, FormControl, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, cleanReviews, deleteReview } from '../../redux/actions/actions';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';


const ReviewCard = () => {
  const currentUser = useSelector(state => state.user)
  const { id } = useParams()
  const dispatch = useDispatch()
  let reviews = useSelector((state) => state.reviews)
  const ratings = reviews && reviews.map(r => r.rating)

  useEffect(() => {
    dispatch(getReviews(id))
      return () => {
        dispatch(cleanReviews()) 
    }
  }, [dispatch, id])

  if(window.location.pathname === `/product/${id}`){
    reviews = reviews.slice(0,3)
  }
  
  const sum = (current, last) => {
    return current + last
  }
  const ratingReduce = ratings.reduce(sum, 0)
  const totalAvg = ratingReduce / ratings.length;

  const disp = window.location.pathname === `/product/${id}`? 'none' :'flex'

  const handlerDelete = (id) => {
    dispatch(deleteReview(id))
    // dispatch(getReviews(pId))
  }

  // const handlerUpdate = (id) => {
  //   dispatch(updateReview(id))
  // }

    return(
        <Stack  direction={{ base: 'column', lg: 'column' }} marginTop='3rem' marginBottom='2rem' >
          { reviews.length ? reviews.map(r => <Card>
            <CardBody bg='gray.200' borderRadius='5px'>
                      {
                        currentUser && currentUser.admin === true ?
                        <Flex padding='20px'>
                          <Stack position='absolute' top={15} right={15} direction='row'>
                              {/* <Button variant='solid' colorScheme='blue' onClick={(e) => handlerUpdate(r.id)}>
                                <Icon as={IoMdCreate}></Icon>
                              </Button> */}
                            <Button colorScheme='red' onClick={(e) => handlerDelete(r.id)}>
                              <Icon as={IoMdTrash}></Icon>
                            </Button>
                          </Stack>
                          </Flex> : <></>
                      }
                <Stack spacing="3" minW='15rem'>
                  <Flex justifyContent='space-between'>
                    <Flex justifyContent='flex-start'>
                      <Text fontWeight='extrabold' marginRight='10px'>
                      {r.title}
                      </Text>
                      <Flex align='center' padding-right='5px'>
                              {[...Array(5)].map((star, i) => {
                          const starValue = i + 1
                          return (
                            <FaStar value={starValue} color={starValue <= Math.floor(totalAvg) ? "gold" : "lightgrey"}/>
                          )
                        })}
                        <Text marginLeft='5px'>
                        {/* {isNaN(totalAvg)? 0 : (Math.floor(totalAvg*10)/10)} */}
                        </Text>
                      </Flex>
                    </Flex>
                    <Text>
                    {r.date.slice(0,10)}
                    </Text>
                  </Flex>
                  <Text>
                  By: {r.author}
                  </Text>
                  <Text fontWeight='bold'>
                  Description:
                  </Text>
                  <Container maxW={window.location.pathname === `/product/${id}` ? '35ch' : '60ch'} borderRadius='5px' bg='gray.400'>{r.description}</Container>
                </Stack>
            </CardBody>
          </Card>) : <Text  marginTop='100px'display={disp}>No reviews yet!</Text>} 
        </Stack>
    )
}

export default ReviewCard;