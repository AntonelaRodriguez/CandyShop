import { Button, Flex, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { getAllProducts, sort } from '../../redux/actions/actions'

const Order = () => {
  // order
  const [order, setOrder] = useState('')
  const dispatch = useDispatch()

  const handlerSort = (e) => {
    setOrder(e.target.value)
    dispatch(sort(e.target.value))
  }

  const handleClear = (e) => {
    setOrder(dispatch(getAllProducts()))
    document.querySelectorAll('option').forEach((option) => (option.selected = false))
  }

  return (
    <Flex direction='row' justifyContent='center' align='center' w='auto'>
      <Select
        placeholder='Sort'
        bg={'primary.200'}
        _hover={{ backgroundColor: 'primary.400' }}
        onChange={handlerSort}
        m={2}
      >
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
        <option value='Price: Highest'>Price: Highest</option>
        <option value='Price: Lowest'>Price: Lowest</option>
      </Select>
      <Button
        variant='solid'
        _hover={{ backgroundColor: 'primary.400' }}
        color='whiteAlpha.900'
        bg={'primary.300'}
        onClick={handleClear}
      >
        <ImCross />
      </Button>
    </Flex>
  )
}

export default Order
