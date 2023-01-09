// import { Flex, Select } from '@chakra-ui/react'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import * as actions from '../../redux/actions/actions'

// const Filters = () => {
//   const filters = useSelector((state) => state.filters)
//   const dispatch = useDispatch()
//   function handleFilters(event) {
//     dispatch(actions.setFilters({ ...filters, [event.target.name]: event.target.value }))
//     dispatch(actions.applyFilters({ ...filters, [event.target.name]: event.target.value }))
//   }
//   return (
//     <Flex direction='row' justifyContent='center' align='center'>
//       <Select
//         placeholder='T.A.C.C'
//         name='tacc'
//         value={filters.tacc}
//         bg={'primary.200'}
//         _hover={{ backgroundColor: 'primary.400' }}
//         onChange={handleFilters}
//         m={2}
//       >
//         <option value='tacc'>With TACC</option>
//         <option value='notacc'>No TACC</option>
//       </Select>

//       <Select
//         placeholder='BRAND'
//         name='brand'
//         value={filters.brand}
//         bg={'primary.200'}
//         _hover={{ backgroundColor: 'primary.400' }}
//         onChange={handleFilters}
//         m={2}
//       >
//         <option value='aguila'>Aguila</option>
//         <option value='arcor'>Arcor</option>
//         <option value='bagley'>Bagley</option>
//         <option value='bon o bon'>Bon o Bon</option>
//         <option value='billiken'>Billiken</option>
//         <option value='bonafide'>Bonafide</option>
//         <option value='cofler'>Cofler</option>
//         <option value='felfort'>Felfort</option>
//         <option value='ferrero'>Ferrero</option>
//         <option value='georgalos'>Georgalos</option>
//         <option value='godet'>Godet</option>
//         <option value='jorgito'>Jorgito</option>
//         <option value='milka'>Milka</option>
//         <option value='mogul'>Mogul</option>
//         <option value='nestle'>Nestle</option>
//         <option value='terrabusi'>Terrabusi</option>
//         <option value='tofi'>Tofi</option>
//         <option value='topline'>Topline</option>
//         <option value='trident'>Trident</option>
//         <option value='unknown'>Unknown</option>
//       </Select>
//       <Select
//         placeholder='CATEGORY'
//         value={filters.category}
//         name='category'
//         bg={'primary.200'}
//         _hover={{ backgroundColor: 'primary.400' }}
//         onChange={handleFilters}
//         m={2}
//       >
//         <option value='biscuits'>biscuits</option>
//         <option value='bubble gum'>bubble gum</option>
//         <option value='caramel cookie'>caramel cookie</option>
//         <option value='candy'>candy</option>
//         <option value='cereal bars'>cereal bars</option>
//         <option value='chocolate'>chocolate</option>
//         <option value='gummies'>gummies</option>
//         <option value='lollipop'>lollipop</option>
//         <option value='bars'>bars</option>
//         <option value='wafers'>wafers</option>
//         <option value='unknown'>unknown</option>
//       </Select>
//     </Flex>
//   )
// }

// export default Filters
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, setFilters, setLoading } from '../../redux/actions/actions.js'
import { Box,Button, Checkbox, Flex,Icon, Stack, Text } from '@chakra-ui/react';
import { IoIosArrowDown, IoIosArrowUp, IoIosClose, IoMdTrash } from 'react-icons/io'
import { IoArrowDownSharp, IoArrowUpSharp} from "react-icons/io5";

const FilterActive = ({ name, value, cb }) => (
  <Button
    size='sm'
    onClick={(e) => { cb(name) }}
    colorScheme='primary'
    variant='outline'
    color='whiteAlpha.900'
    bg={'primary.300'}
    _hover={{ backgroundColor: 'primary.400' }}
    padding='0 0 0 .5em'
  >
    <Flex alignItems='center' justifyContent='center'>
      <Text textTransform='capitalize'>"{value}"</Text>
      <Icon boxSize={6} as={IoIosClose} />
    </Flex>
  </Button>
)

const StatusFilters = ({ setOpenFilters, openFilters }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters);

  function handleResetFilter(name) {
    dispatch(setLoading(true));
    name === "order"
      ? dispatch(setFilters({ ...filters, order: "", reverse: false }))
      : dispatch(setFilters({ ...filters, [name]: "" }));
    dispatch(applyFilters());
  }
  function handleResetAll() {
    dispatch(setLoading(true));
    dispatch(setFilters({ order: '', tacc: '', brand: '', category: '', reverse: false }))
    dispatch(applyFilters());
  }
 
  return (
    <Flex position='relative' alignSelf='flex-start' w='full' alignItems='center'>
      <Button
        onClick={(e) => { setOpenFilters(!openFilters) }}
        colorScheme='primary'
        variant='outline'
        color='whiteAlpha.900'
        bg={'primary.300'}
        _hover={{ backgroundColor: 'primary.400' }}
      >
        <Flex gap={2} alignItems='center' alignContent='center' p='0 .5em 0 .5em'>
          {
            openFilters
              ? <>
                <Text>Hide Filters</Text>
                <Icon boxSize={4} as={IoIosArrowUp} />
              </>
              : <>
                <Text>Show Filters</Text>
                <Icon boxSize={4} as={IoIosArrowDown} />
              </>
          }
        </Flex>
      </Button>

      <Flex w='full' gap={2} justifyContent='flex-end'>
        {filters.order?.length > 0 && <FilterActive name="order" value={filters.order} cb={handleResetFilter} />}
        {filters.brand?.length > 0 && <FilterActive name="brand" value={filters.brand} cb={handleResetFilter} />}
        {filters.category?.length > 0 && <FilterActive name="category" value={filters.category} cb={handleResetFilter} />}
        {filters.tacc?.length > 0 && <FilterActive name="tacc" value={filters.tacc} cb={handleResetFilter} />}
        {
          ( filters.order?.length > 0 || filters.brand?.length > 0 || filters.category?.length > 0 || filters.tacc?.length > 0)
          &&
          <Button
            size='sm'
            onClick={handleResetAll}
            colorScheme='primary'
            variant='outline'
            color='whiteAlpha.900'
            bg={'primary.300'}
            _hover={{ backgroundColor: 'primary.400' }}
          >
            <Icon boxSize={5} as={IoMdTrash} />
          </Button>
        }
      </Flex>
    </Flex>
  )
}

const OptionFilter = ({ name, currentValue, value, cb }) => {
  return <Box as='label' display='flex' cursor='pointer' >
    <Checkbox
      name={name}
      value={value}
      display='none'
      onChange={(e) => { cb(e, name) }}
      checked={value === currentValue}
    />
    <Text
      w='full'
      borderRadius='md'
      display='block'
      _hover={{ backgroundColor: 'primary.400' }}
      color="whiteAlpha.900"
      bg={value === currentValue ? 'primary.200' : ''}
      fontWeight='600'
      textIndent='.5em'
      textTransform='capitalize'
      pr='.5em'
    >{value}</Text>
  </Box>
}
const Filters = () => {

  const [openFilters, setOpenFilters] = useState(false);
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters);
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories)

  function handleFilters(e, filterName) {
    dispatch(setLoading(true));
    filterName === "order"
      ? dispatch(setFilters({ ...filters, order: e.target.value, reverse: false }))
      : dispatch(setFilters({ ...filters, [filterName]: e.target.value }));
    dispatch(applyFilters());
  }
  function handleReverse(value) {
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, reverse: value }));
    dispatch(applyFilters());
  }
  useEffect(() => {
    const handleClick = (e) => {
      !document.getElementById('filtersContainer').contains(e.target) 
        && setOpenFilters(false);
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setOpenFilters]);
  return (
    <Flex id='filtersContainer' zIndex={3} alignSelf='center' position='relative' h={openFilters ? "22em" : '3em'} w='44em'>
      <StatusFilters openFilters={openFilters} setOpenFilters={setOpenFilters} />
      <Flex
        pointerEvents={openFilters ? 'all' : 'none'}
        opacity={openFilters ? 1 : 0}
        colorScheme='primary'
        variant='outline'
        color='whiteAlpha.900'
        bg={openFilters ? 'primary.300' : 'whiteAlpha.900'}
        position='absolute'
        top='3em'
        zIndex={!openFilters ? -1 : 1}
        left='0'
        w='max-content'
        borderRadius='md'
        h='15em'
        transition='200ms top ease, 200ms background-color ease, 200ms opacity ease'
      >
        <Stack minW='8em' m='1em 1.5em 1em 1.5em' position='relative'>
          <Flex w='full' justifyContent='center'>
            <Text fontWeight={600}>ORDER</Text>
            {
              filters.order.length > 0
              &&
              <Flex justifyContent='flex-end'>

              <Box
                ml='1em'
                borderRadius='md'
                _hover={{ backgroundColor: 'primary.400' }}
                display='flex'
                alignContent='center'
                justifyContent='center'
                border='2px solid #E6E6E6'
                opacity={!filters.reverse ? 1 : .5}
              >
                <Icon
                  as={IoArrowDownSharp}
                  boxSize={5}
                  cursor='pointer'
                  justifySelf='flex-end'
                  onClick={() => handleReverse(false)}
                  />
              </Box>
              <Box
                ml='.5em'
                borderRadius='md'
                _hover={{ backgroundColor: 'primary.400' }}
                display='flex'
                alignContent='center'
                justifyContent='center'
                border='2px solid #E6E6E6'
                opacity={filters.reverse ? 1 : .5}
              >
                <Icon
                  as={IoArrowUpSharp}
                  boxSize={5}
                  cursor='pointer'
                  justifySelf='flex-end'
                  onClick={() => handleReverse(true)}
                  />
              </Box>
              </Flex>
            }
          </Flex>
          <hr />
          <Stack width='full' >
            <OptionFilter name="order" value="alphabetical" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="price" currentValue={filters.order} cb={handleFilters} />
          </Stack>
        </Stack>
        <Stack minW='8em' m='1em 1.5em 1em 1.5em' >
          <Flex w='full' justifyContent='center'> <Text fontWeight={600}>BRANDS</Text></Flex>
          <hr />
          <Stack margin='0' padding='.5em 0 .5em 0' width='full'
            overflowY='scroll'
            // sx={{ '::-webkit-scrollbar': { display: 'none' } }}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'white',
                borderRadius: '24px',
              },
            }}
          >
            {
              brands?.map((a, i) =>
                <OptionFilter key={`brand${i}`} name="brand" value={a} currentValue={filters.brand} cb={handleFilters}>{a}</OptionFilter>
              )
            }
          </Stack>
        </Stack>
        <Stack m='1em 1.5em 1em 1.5em'>
          <Flex w='full' justifyContent='center'> <Text fontWeight={600}>CATEGORIES</Text></Flex>
          <hr />
          <Stack
            margin='0' padding='.5em 0 .5em 0' w='full'
            overflowY='scroll'
            // sx={{ '::-webkit-scrollbar': { display: 'none' } }}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'white',
                borderRadius: '24px',
              },
            }}
          >
            {
              categories?.map((a, i) =>
                <OptionFilter key={a.name || a} name="category" value={a.name || a} currentValue={filters.category} cb={handleFilters}>{a.name || a}</OptionFilter>
              )
            }
          </Stack>
        </Stack>
        <Stack minW='8em' m='1em 1.5em 1em 1.5em'>
          <Flex w='full' justifyContent='center'> <Text fontWeight={600}>TACC</Text></Flex>
          <hr />
          <Stack width='full'>
            <OptionFilter name="tacc" value="notacc" currentValue={filters.tacc} cb={handleFilters} />
            <OptionFilter name="tacc" value="tacc" currentValue={filters.tacc} cb={handleFilters} />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default Filters