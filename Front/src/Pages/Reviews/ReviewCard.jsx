import React, { useEffect } from 'react';
import { Card, CardBody, Container, Flex, FormControl, Heading, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, cleanReviews } from '../../redux/actions/actions';
import { useParams } from 'react-router-dom';


const ReviewCard = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getReviews(id))
      return () => {
        dispatch(cleanReviews()) 
    }
  }, [dispatch, id])

  let reviews = useSelector((state) => state.reviews)
  if(window.location.pathname === `/product/${id}`){
    reviews = reviews.slice(0,3)
  }

    return(
        <Stack  direction={{ base: 'column', lg: 'column' }} marginTop='2rem'>
          {reviews && reviews.map(r => <Card>
            <CardBody>
                <Stack spacing="3" minW='15rem'>
                  <Flex justifyContent='space-between'>
                    <Flex justifyContent='flex-start'>
                      <Text fontWeight='extrabold' marginRight='10px'>
                      {r.title}
                      </Text>
                      <Text>
                      Rating: {r.rating}
                      </Text>
                    </Flex>
                    <Text>
                    {r.date.slice(0,10)}
                    </Text>
                  </Flex>
                  <Text fontWeight='bold'>
                  By: {r.author}
                  </Text>
                  <Text>
                  Description:
                  </Text>
                  <Container maxW={window.location.pathname === `/product/${id}` ? '20ch' : '60ch'} border='1px' borderRadius='5px'>{r.description}</Container>
                </Stack>
            </CardBody>
          </Card>)} 
        </Stack>
    )
}

export default ReviewCard;