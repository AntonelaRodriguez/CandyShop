import React from 'react'
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
   } from "@chakra-ui/react";
import { getUser, postUserDetail, updateUserDetail } from '../../../redux/actions/actions';
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
  const currentUser = useSelector(state => state.user)

  useEffect(() => {
      dispatch(getUser(user.email))
  },[dispatch])

  // function setValue(){
  //   setStoredValue(currentUser.UserDetail)
  // }

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    companyName: "",
    phoneNumber: null,
    address: "",
  });
//   console.log(currentUser, 'user ')
  
  function handleChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const newDetail = {
    email: isAuthenticated ? user.email : "",
    name: input.name,
    lastName: input.lastName,
    companyName: input.companyName,
    phoneNumber: input.phoneNumber,
    address: input.address,
    image: isAuthenticated ? user.picture : ""
  };

  // console.log(newDetail, 'NewDetail');

  function handleSubmit(e) {
    e.preventDefault()
    if(!currentUser.UserDetail){
      dispatch(postUserDetail(newDetail))
      setInput({
        name: "",
        lastName: "",
        companyName: "",
        phoneNumber: "",
        address: "",
      })
      dispatch(getUser(user.email))
      alert("User details updated successfully")
      navigate('/products')
    }
    dispatch(updateUserDetail(newDetail))
    setInput({
      name: "",
      lastName: "",
      companyName: "",
      phoneNumber: "",
      address: "",
    })
    dispatch(getUser(user.email))
    alert("User details updated successfully")
      navigate('/products')
  }



  return (
    <Stack direction='row' align='center' justify='center' gap={15}>
      <form action='submit' onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            placeholder={currentUser.UserDetail ? currentUser.UserDetail.name : '...'} 
            />

            <FormLabel>Last Name</FormLabel>
            <Input
            type="text"
            value={input.lastName}
            name="lastName"
            onChange={handleChange}
            placeholder={currentUser.UserDetail ? currentUser.UserDetail.lastName : '...'} 
            />

            <FormLabel>Company</FormLabel>
            <Input
            type="text"
            value={input.companyName}
            name="companyName"
            onChange={handleChange}
            placeholder={currentUser.UserDetail ? currentUser.UserDetail.companyName : '...'} 
            />

            <FormLabel>Phone Number</FormLabel>
            <Input
            type="number"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            placeholder={currentUser.UserDetail ? currentUser.UserDetail.phoneNumber : '...'} 
            />

            <FormLabel>Address</FormLabel>
            <Input
            type="text"
            value={input.address}
            name="address"
            onChange={handleChange}
            placeholder={currentUser.UserDetail ? currentUser.UserDetail.address : '...'} 
            />
          </FormControl>
          <Button type="submit" colorScheme="primary">
            Change details
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default EditUser;