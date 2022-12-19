import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SimpleSidebar from "./src/NavAdmin/NavAdmin";
const ProductsAdmin = () => {
  return (
    <>
      <SimpleSidebar />
      <Button
        _hover={{
          color: "#000",
        }}
        colorScheme="primary"
        variant="outline"
      >
        <Link to="/create">Create</Link>
      </Button>
      <div>ProductsAdmin</div>
    </>
  );
};

export default ProductsAdmin;
