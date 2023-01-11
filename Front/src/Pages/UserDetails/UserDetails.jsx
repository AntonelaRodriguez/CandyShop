import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, FormLabel, Stack, Input, Button, VStack, Flex, Box, FormErrorMessage, Checkbox, Spinner } from '@chakra-ui/react'
import { getUser, postUserDetail, updateUserDetail } from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Formik, Field } from "formik";
// import { useLocalStorage } from '../../Components/useLocalStorage/useLocalStorage'

const UserDetails = () => {
  const { isAuthenticated, user } = useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [storedValue, setStoredValue] = useLocalStorage('userDetail', {})
  const usuario = useSelector((state) => state.user);
  let initialInput = {
    email: '',
    name: '',
    lastName: '',
    companyName: '',
    phoneNumber: '',
    address: '',
    image: ''
  }
  const [input, setInput] = useState(initialInput);

  const [loadReady, setLoadReady] = useState(false);
  setTimeout(() => setLoadReady(true), 2000);

  useEffect(() => {
    if (Object.entries(usuario).length && !usuario?.UserDetail && user) {
      setInput({ ...input, email: usuario.email, image: user.picture })
    }
    if (usuario?.UserDetail) {
      setInput({
        ...input,
        email: usuario.email,
        name: usuario.UserDetail.name,
        lastName: usuario.UserDetail.lastName,
        companyName: usuario.UserDetail.companyName,
        phoneNumber: usuario.UserDetail.phoneNumber,
        address: usuario.UserDetail.address,
        image: usuario.UserDetail.image
      })
    }
  }, [usuario, isAuthenticated, user])

  function handleSubmit(values) {
    if (!usuario.UserDetail) {
      dispatch(postUserDetail({ ...input, ...values }))
    } else {
      dispatch(updateUserDetail({ ...input, ...values }))
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your information  has been saved',
      showConfirmButton: false,
      timer: 1800
    }).then(() => {
      dispatch(getUser(usuario.email))
      setInput(initialInput)
      navigate('/products')
    })
  }

  return (
    <Flex  align="center" justify="center" maxW='22em' w='90vw' mb={10}>
      <Box bg='primary.200' p={6} rounded="md" w='full' minH='32em' position='relative' >
        {
          !loadReady
            ? <Spinner
              thickness='10px'
              speed='0.65s'
              emptyColor='gray.200'
              color={'primary.200'}
              size='xl'
              p={10}
              m={10}
              position='absolute'
              top='0'
              left='0'
              right='0'
              bottom='0'
              margin='auto'
            />
            :
            <Formik
              initialValues={{
                name: input.name,
                lastName: input.lastName,
                companyName: input.companyName,
                phoneNumber: input.phoneNumber,
                address: input.address,
              }}
              onSubmit={handleSubmit}
              w='full'

            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit} autoComplete='false' >
                  <VStack
                    spacing={4}
                    align="flex-start"
                    w='full'
                  >
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                        placeholder='Robert'
                        validate={(value) => {
                          let error;
                          if (!(/^[a-zA-Z0-9\u00C0-\u017F()" "]{2,20}$/.test(value))) {
                            error = "Name must contain 2 to 20 characters";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Field
                        as={Input}
                        id="lastName"
                        name="lastName"
                        type="text"
                        variant="filled"
                        placeholder='Jones'
                        validate={(value) => {
                          let error;
                          if (!(/^[a-zA-Z0-9\u00C0-\u017F()" "]{2,20}$/.test(value))) {
                            error = "Last Name must contain 2 to 20 characters";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.companyName && touched.companyName}>
                      <FormLabel htmlFor="companyName">Company Name</FormLabel>
                      <Field
                        as={Input}
                        id="companyName"
                        name="companyName"
                        type="companyName"
                        variant="filled"
                        placeholder="Jones' Candy"
                        validate={(value) => {
                          let error;
                          if (!(/^[a-zA-Z0-9\u00C0-\u017F()" "]{2,20}$/.test(value))) {
                            error = "Company Name must contain 2 to 20 characters";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.companyName}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.phoneNumber && touched.phoneNumber}>
                      <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                      <Field
                        as={Input}
                        id="phoneNumber"
                        name="phoneNumber"
                        variant="filled"
                        placeholder='+549342112233'
                        validate={(value) => {
                          let error;
                          if (!(/^[0-9]{6,30}$/.test(value))) {
                            error = "Phone Number must contain 6 to 30 digites";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.address && touched.address}>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <Field
                        as={Input}
                        id="address"
                        name="address"
                        type="text"
                        variant="filled"
                        placeholder="14 Rainsford St"
                        validate={(value) => {
                          let error;
                          if (!(/^[a-zA-Z0-9\u00C0-\u017F()" "]{4,24}$/.test(value))) {
                            error = "Address must contain 4 to 24 characters";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.address}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit" bg='primary.300' width="full">
                      Save
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
        }
      </Box>
    </Flex>
  )
}

export default UserDetails