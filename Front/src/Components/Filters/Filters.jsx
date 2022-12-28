import { Flex, Select } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/actions'

const Filters = () => {
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  function handleFilters(event) {
    dispatch(actions.setFilters({ ...filters, [event.target.name]: event.target.value }))
    dispatch(actions.applyFilters({ ...filters, [event.target.name]: event.target.value }))
  }
  return (
    <Flex direction='row' justifyContent='center' align='center'>
      <Select
        placeholder='T.A.C.C'
        name='tacc'
        value={filters.tacc}
        bg={'primary.200'}
        _hover={{ backgroundColor: 'primary.400' }}
        onChange={handleFilters}
        m={2}
      >
        <option value='tacc'>With TACC</option>
        <option value='notacc'>No TACC</option>
      </Select>

      <Select
        placeholder='BRAND'
        name='brand'
        value={filters.brand}
        bg={'primary.200'}
        _hover={{ backgroundColor: 'primary.400' }}
        onChange={handleFilters}
        m={2}
      >
        <option value='aguila'>Aguila</option>
        <option value='arcor'>Arcor</option>
        <option value='bagley'>Bagley</option>
        <option value='bon o bon' option>
          Bon o Bon
        </option>
        <option value='billiken'>Billiken</option>
        <option value='bonafide'>Bonafide</option>
        <option value='cofler'>Cofler</option>
        <option value='felfort'>Felfort</option>
        <option value='ferrero'>Ferrero</option>
        <option value='georgalos'>Georgalos</option>
        <option value='godet'>Godet</option>
        <option value='jorgito'>Jorgito</option>
        <option value='milka'>Milka</option>
        <option value='mogul'>Mogul</option>
        <option value='nestle'>Nestle</option>
        <option value='terrabusi'>Terrabusi</option>
        <option value='tofi'>Tofi</option>
        <option value='topline'>Topline</option>
        <option value='trident'>Trident</option>
        <option value='unknown'>Unknown</option>
      </Select>
      <Select
        placeholder='CATEGORY'
        value={filters.category}
        name='category'
        bg={'primary.200'}
        _hover={{ backgroundColor: 'primary.400' }}
        onChange={handleFilters}
        m={2}
      >
        <option value='biscuits'>biscuits</option>
        <option value='bubble gum'>bubble gum</option>
        <option value='caramel cookie'>caramel cookie</option>
        <option value='candy'>candy</option>
        <option value='cereal bars'>cereal bars</option>
        <option value='chocolate'>chocolate</option>
        <option value='gummies'>gummies</option>
        <option value='lollipop'>lollipop</option>
        <option value='bars'>bars</option>
        <option value='wafers'>wafers</option>
        <option value='unknown'>unknown</option>
      </Select>
    </Flex>
  )
}

export default Filters
