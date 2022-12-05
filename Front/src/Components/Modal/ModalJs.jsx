import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,Flex
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const ModalJs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex justifyContent="center" align="center" minH="100vh" bgColor="gray.900">
      <Button colorScheme="facebook" onClick={onOpen}>Open Modal</Button>

      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem molestiae quo in magni similique nemo voluptate
            aspernatur placeat deleniti, provident excepturi vel vero hic
            impedit, possimus eos ea tenetur ratione?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default ModalJs
