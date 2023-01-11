import { useAuth0 } from "@auth0/auth0-react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import img from '../../../assets/user-png-33842.png'
import { getUser, updateUser } from "../../../redux/actions/actions";
import EditUser from "../EditUser/EditUser";

const CardUserAdmin = ({
  email,
  name,
  lastName,
  companyName,
  phoneNumber,
  address,
  image,
  banned,
  admin
}) => {

  return (
    <Card
      w="full"
      h="full"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      direction={{ base: "column", sm: "column", md: "row" }}
      overflow="hidden"
      variant="elevated"
      boxShadow="xl"
      bg="gray.100"
      size="sm"
      gap={10}
      p={5}
      position="relative"
    >
      <Stack margin="auto" w={{ base: "full", sm: "20%", lg: "15%" }} h="full">
        <Image
          objectFit="cover"
          w="full"
          margin="auto"
          h="full"
          src={image ? image : img}
          loading="lazy"
          alt={name}
        />
      </Stack>

      <Stack
        w="100%"
        flex={1}
        justifyContent="space-between"
        direction={{ base: "column-reverse", lg: "row" }}
        alignItems="flex-start"
      >
        <CardBody
          w="full"
          display="flex"
          h="full"
          alignItems="flex-start"
          gap={5}
          justifyContent="space-between"
          flexDirection="column"
        >
          <Flex fontWeight={300} size="sm" flexDirection="column" w="100%">
            <Heading fontWeight={700} size="md">
              {email}
            </Heading>
            <Text>Name: {name} {lastName}</Text>
            <Text>Company: {companyName}</Text>
            <Text>PhoneNumber: {phoneNumber}</Text>
            <Text>Address: {address}</Text>
          </Flex>
        </CardBody>

        <Stack h="full" direction="row">
          <Button
            size={{ base: "xs", lg: "sm" }}
            variant="solid"
            colorScheme="blue"
          >
            <Link to={`/editUser/${email}`}>Edit Status</Link>
          </Button>
        </Stack>
      </Stack>
      <Tag
        variant="outline"
        size="sm"
        colorScheme= {banned === true ? 'red' : "green"}
        w="fit-content"
        position="absolute"
        top="5px"
        left="5px"
      >
        <TagLabel> {email === 'pepo@gmail.com' ? 'Main Admin' : banned === true ? 'Banned' : admin === true ? 'Admin' : 'Active'} </TagLabel>
      </Tag>
    </Card>
  );
};

export default CardUserAdmin;
