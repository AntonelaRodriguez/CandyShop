import React from 'react'
import { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, FormLabel, Stack, Input, Button } from '@chakra-ui/react'
import { getUser, postUserDetail, updateUserDetail } from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
// import { useLocalStorage } from '../../Components/useLocalStorage/useLocalStorage'

const Label = ({lname, name, value, cb}) => (
  <>
    <FormLabel pt={5} textIndent={12}>{lname}</FormLabel>
    <Input
      type='text'
      value={value}
      name={name}
      onChange={cb}
      placeholder={value}
      bg='primary.100' 
    />
  </>
)

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

  useEffect(() => {
    if(Object.entries(usuario).length && !usuario?.UserDetail && user) {
      setInput({ ...input, email: usuario.email, image: user.picture})
    }
    if(usuario?.UserDetail) {
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

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(!usuario.UserDetail) {
      dispatch(postUserDetail(input))
    } else {
      dispatch(updateUserDetail(input))
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
    <Stack 
      direction='row' 
      align='center' 
      justify='center' 
      bg='primary.200' 
      p='1em 3em 1em 3em'
      borderRadius='md'
    >
      <form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
        <Stack spacing={9}>
          <FormControl isRequired >
            <Label lname='Name' name='name' value={input?.name} cb={handleChange} />
            <Label lname='Last name' name='lastName' value={input?.lastName} cb={handleChange}/>
            <Label lname='Company name' name='companyName' value={input?.companyName} cb={handleChange}/>
            <Label lname='Phone number' name='phoneNumber' value={input?.phoneNumber} cb={handleChange}/>
            <Label lname='Address' name='address' value={input?.address} cb={handleChange}/>
          </FormControl>
          <Button 
            type='submit' 
            variant='solid'
            _hover={{ backgroundColor: 'primary.400' }}
            color='whiteAlpha.900'
            bg={'primary.300'}
          > 
            Change details 
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default UserDetails