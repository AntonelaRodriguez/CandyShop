import { Button, Flex, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/actions'

const Searchname = ({ name,setName, handleChange }) => {
  const dispatch = useDispatch()
  const handleSumbit = (event) => {
    event.preventDefault()
    if (name) {
      dispatch(actions.searchCandy(name))
      setName('')
    } else {
      dispatch(actions.getAllProducts())
    }
  }

  return (
    <form onSubmit={(event) => handleSumbit(event)}>
      <Flex bg='primary.200' p={2} borderRadius={'md'} justifyContent='center' width='full'>
        <Input
          paddingRight={2}
          paddingLeft={2}
          value={name}
          type='search'
          focusBorderColor='#ffffff78'
          // variant='unstyled'
          outline='none'
          border={'none'}
          _focus={{ outline: 'none', border: 'none' }}
          _placeholder={{ opacity: 1, color: 'white' }}
          name=''
          placeholder='Search...'
          id=''
          width='full'
          onChange={handleChange}
        />
        <Button
          type='submit'
          variant='solid'
          _hover={{ backgroundColor: 'primary.400' }}
          color='whiteAlpha.900'
          bg={'primary.300'}
        >
          <BsSearch />
        </Button>
      </Flex>
    </form>
  )
}

export default Searchname
