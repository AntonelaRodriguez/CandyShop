import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CardUserAdmin = ({
  name,
  lastName,
  companyName,
  phoneNumber,
  address,
  image,
}) => {
  return (
    <Card
      w="400px"
      h="150px"
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
    >
      <Stack margin="auto" w={{ base: "full", sm: "20%", lg: "15%" }} h="full">
        <Image
          objectFit="cover"
          w="full"
          margin="auto"
          h="full"
          src="https://imgs.search.brave.com/r6TBQaVZ6R-YCIDK0ViahPr0maxIvQniZo5pzWBf2vs/rs:fit:1000:600:1/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd2lweS50/di93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OS8wMS9NdXJpJUMz/JUIzLWVsLXBlcnJp/dG8tbSVDMyVBMXMt/ZmFtb3Nvcy1kZS1p/bnRlcm5ldC0yLmpw/Zz9maXQ9MTAwMCUy/QzYwMCZzc2w9MQ"
          loading="lazy"
          alt={name}
        />
      </Stack>

      <Stack
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
          <Heading fontWeight={700} size="sm">
            {name} {lastName}
          </Heading>

          <Text fontWeight={300} size="sm">
            {companyName}
            {phoneNumber}
            {address}
          </Text>

          <Stack>
            <Tag variant="outline" size="sm" colorScheme="primary">
              <TagLabel> activa </TagLabel>
            </Tag>
          </Stack>
        </CardBody>

        <Stack h="full" direction="row">
          <Button
            size={{ base: "xs", lg: "sm" }}
            variant="solid"
            colorScheme="blue"
          >
            <Link to={"/edit/"}>Edit User</Link>
          </Button>
          <Button>Delete User</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardUserAdmin;
