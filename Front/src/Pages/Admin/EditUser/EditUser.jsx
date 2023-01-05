import React, { useRef } from 'react'
import { useState, 
  // useEffect
 } from 'react'
import { useDispatch, useSelector, 
  // useSelector 
} from 'react-redux'
// import axios from 'axios'
import { 
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  HStack,
  Select,
  Text,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  RadioGroup,
  Radio,
   } from "@chakra-ui/react";
import { getAllUsers, getUser, postUserDetail, updateUser, updateUserDetail } from '../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react"
import { useEffect } from 'react';
import { useLocalStorage } from '../../../Components/useLocalStorage/useLocalStorage';

// import userRouter from '../../../../Back/src/routes/userRouter';


const EditUser = (props) => {

  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [storedValue, setStoredValue] = useLocalStorage('userDetail', {});
  // const currentUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const currentUser = users && users.filter(u => window.location.pathname === `/editUser/${u.email}`)

  useEffect(() => {
      dispatch(getAllUsers())
  },[dispatch])

   

  // function setValue(){
  //   setStoredValue(currentUser.UserDetail)
  // }

// console.log(currentUser[0]);

  const [input, setInput] = useState({
    email: currentUser[0].email,
    banned: currentUser[0].banned,
    admin: currentUser[0].admin
  });
  console.log(currentUser[0], 'user ')
// console.log(user);
  
  function handleChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const newDetail = {
    email: input.email,
    banned: input.banned === 'true' ? true : false,
    admin: input.admin === 'true' ? true : false
  };

  console.log(newDetail, 'NewDetail');

  function handleSubmit(e) {
    // e.preventDefault()
    dispatch(updateUser(newDetail))
    // dispatch(getUser(currentUser[0].email))
    navigate('/admin/UsersAdmin')
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()


  return (
    <Stack direction='column' align='center' justify='center' gap={15}>
      <Heading fontWeight={700} size="lg" >{`Edit User: ${currentUser[0].UserDetail.name} ${currentUser[0].UserDetail.lastName}`}</Heading>
      <form action='submit' onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={7}>
          <FormControl isRequired>
          <FormLabel as='legend' marginTop='1rem'>Ban</FormLabel>
            <RadioGroup defaultValue={currentUser[0].banned === true ? 'true' : 'false'}>
              <HStack spacing='24px'>
                <Radio name='banned' onChange={(e) => handleChange(e)} value='false'>
                  No
                </Radio>
                <Radio name='banned' onChange={(e) => handleChange(e)} value='true'>
                  Yes
                </Radio>
              </HStack>
            </RadioGroup>


            <FormLabel as='legend' marginTop='2rem'>Admin</FormLabel>
            <RadioGroup defaultValue={currentUser[0].admin === true ? 'true' : 'false'}>
              <HStack spacing='24px'>
                <Radio name='admin' onChange={(e) => handleChange(e)} value='false'>
                  No
                </Radio>
                <Radio name='admin' onChange={(e) => handleChange(e)} value='true'>
                  Yes
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Button onClick={onOpen} colorScheme="primary">
            Change details
          </Button>

          <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Edit User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' 
              // type='submit'
              onClick={(e) => {handleSubmit(e); onClose(e)}} 
              ml={3}>
                Save changes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </Stack>
      </form>
    </Stack>
  )
}

export default EditUser;