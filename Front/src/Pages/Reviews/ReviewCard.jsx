import React, { useEffect } from 'react';
import { Card, CardBody, Flex, FormControl, Heading, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, cleanReviews } from '../../redux/actions/actions';


const ReviewCard = () => {
    const product = useSelector((state) => state.productDetail);
    let reviews = useSelector((state) => state.reviews)
    if(window.location.pathname === `/product/${product.id}`){
      reviews = reviews.slice(0,3)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviews(product.id))
        return () => {
			dispatch(cleanReviews()) 
		}
      }, [dispatch, product.id])

    return(
        <Stack  direction={{ base: 'column', lg: 'row' }}>
          {reviews && reviews.map(r => <Card>
            <CardBody>
                <Stack spacing="3" >
                  <Text>
                  Title: {r.title}
                  </Text>
                  <Text>
                  Author: {r.author}
                  </Text>
                  <Text>
                  Date: {r.date}
                  </Text>
                  <Text>
                  Rating: {r.rating}
                  </Text>
                  <Text>
                  Description: {r.description}
                  </Text>
                </Stack>
            </CardBody>
          </Card>)} 
        </Stack>
    )
}

export default ReviewCard;