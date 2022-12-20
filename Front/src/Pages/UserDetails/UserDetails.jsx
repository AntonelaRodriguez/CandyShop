import React from 'react'
import { useState, 
  // useEffect
 } from 'react'
import { useDispatch, 
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
import { postUserDetail } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react"

// import userRouter from '../../../../Back/src/routes/userRouter';


const UserDetails = (props) => {

  const { loginWithRedirect,  isAuthenticated, user, logout } = useAuth0();
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [input, setInput] = useState({
    email: "",
    name: "",
    lastName: "",
    companyName: "",
    phoneNumber: null,
    address: "",
    image: ""
  });
  console.log(user)
  
  const newDetail = {
    email: isAuthenticated ? user.email : "",
    name: input.name,
    lastName: input.lastName,
    companyName: input.companyName,
    phoneNumber: input.phoneNumber,
    address: input.address,
    image: input.image
  };

  function handleChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  console.log(newDetail);

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(postUserDetail(newDetail))
    setInput({
    name: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    address: "",
    image: "",
    })
    alert("User details updated successfully")
    navigate('/userDetails')
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
            />

            <FormLabel>Last Name</FormLabel>
            <Input
            type="text"
            value={input.lastName}
            name="lastName"
            onChange={handleChange}
            />

            <FormLabel>Company</FormLabel>
            <Input
            type="text"
            value={input.companyName}
            name="companyName"
            onChange={handleChange}
            />

            <FormLabel>Phone Number</FormLabel>
            <Input
            type="number"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            />

            <FormLabel>Address</FormLabel>
            <Input
            type="text"
            value={input.address}
            name="address"
            onChange={handleChange}
            />

            <FormLabel>Image</FormLabel>
            <Input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
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

export default UserDetails;