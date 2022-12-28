import CardUserAdmin from "./CardUserAdmin/CardUserAdmin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/actions";
import SimpleSidebar from "./src/NavAdmin/NavAdmin";
import { Container } from "@chakra-ui/react";
const UsersAdmin = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  console.log(users, "Hola");
  return (
    <>
      <SimpleSidebar maxW="container.lg" />
      <Container
        display="flex"
        w="full"
        flexDirection={{ base: "column", md: "column" }}
        gap={10}
      >
        {users &&
          users.map((u) => {
            /* console.log(u.UserDetail.name, "test"); */
            return (
              <CardUserAdmin
                name={u.UserDetail ? u.UserDetail.name : "..."}
                lastName={u.UserDetail ? u.UserDetail.lastName : "..."}
                companyName={u.UserDetail ? u.UserDetail.companyName : "..."}
                phoneNumber={u.UserDetail ? u.UserDetail.phoneNumber : "..."}
                address={u.UserDetail ? u.UserDetail.address : "..."}
                image={u.UserDetail ? u.UserDetail.image : "..."}
              />
            );
          })}
      </Container>
    </>
  );
};

export default UsersAdmin;
