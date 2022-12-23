import React, { useEffect } from 'react';
import { Card, CardBody, Flex, FormControl, Heading, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, cleanReviews } from '../../redux/actions/actions';

const ReviewCard = () => {
    const product = useSelector((state) => state.productDetail);
    const reviews = useSelector((state) => state.reviews)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllReviews(product.id))
        return () => {
			dispatch(cleanReviews())   //funcion que limpia el detalle una vez que salimos de la pag, vuelve a poner al estado como un array vacio
		}
      }, [dispatch, product.id])
      console.log(reviews);
      console.log(product.id)
      //description, author, rating, date, title
    return(
        <Stack>
          {reviews && reviews.map(r => <Card>
            <CardBody>
                <Stack spacing="3" >
                  <Text color='blue.600' fontSize='2xl'>
                  {r.title}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                  {r.author}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                  {r.date}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                  {r.rating}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                  {r.description}
                  </Text>
                </Stack>
            </CardBody>
          </Card>)} 
        </Stack>
    )
}

export default ReviewCard;