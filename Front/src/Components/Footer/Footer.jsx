import {useState} from 'react';
import {useLocalStorage} from '../useLocalStorage/useLocalStorage'
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";


const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {

  const [mail, setMail] = useLocalStorage('mail', '')

  return (
    <Flex as="nav" align="center" justify="center" wrap="wrap" py={6} w="full">
      <Box
        w="full"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        borderRadius="md"
        height="full"
        margin="auto"
        boxShadow="2xl"
        bg="gray.300"
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid templateColumns="repeat(3, 1fr)" spacing={8}>
            <GridItem align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Link href={"#"}>Contact us</Link>
            </GridItem>
            <GridItem>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>Help Center</Link>
            </GridItem>
            <GridItem align={"flex-start"}>
              <ListHeader>Stay up to date</ListHeader>
              <Stack direction={"row"}>
                <Input
                  onChange={(e) => setMail(e.target.value)}
                  value = {mail}
                  placeholder={"Your email address"}
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <IconButton
                  bg={useColorModeValue("primary.300", "green.800")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "green.600",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Box>
    </Flex>
  );
}
