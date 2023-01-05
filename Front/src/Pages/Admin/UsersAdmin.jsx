import CardUserAdmin from './CardUserAdmin/CardUserAdmin'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/actions'
import SimpleSidebar from './src/NavAdmin/NavAdmin'
import { Container, Spinner, Stack } from '@chakra-ui/react'
const UsersAdmin = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const [name, setName] = useState('')

  const handleChange = (event) => {
    setName(event.target.value)
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  return (
    <Container
      maxW='container.lg'
      display='flex'
      w='full'
      flexDirection={{ base: 'column', md: 'column' }}
      gap={10}
    >
      <Stack direction='column' w='full' align='center' justifyContent='space-between'>
        {/* // productos y sidebar */}
        <Stack justifyContent='space-between' direction='row'>
          <SimpleSidebar />
          <Stack w='full' h='full' gap={4} p={5}>
            {users.length ? (
              users.map((u) => {
                // console.log(u)
                return (
                  <CardUserAdmin
                    key={u.email}
                    email={u.email}
                    banned = {u.banned}
                    admin = {u.admin}
                    name={u.UserDetail ? u.UserDetail.name : ''}
                    lastName={u.UserDetail ? u.UserDetail.lastName : ''}
                    companyName={u.UserDetail ? u.UserDetail.companyName : ''}
                    phoneNumber={u.UserDetail ? u.UserDetail.phoneNumber : ''}
                    address={u.UserDetail ? u.UserDetail.address : ''}
                    image={u.UserDetail ? u.UserDetail.image : ''}
                  />
                )
              })
            ) : (
              <Spinner size='xl' />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default UsersAdmin
