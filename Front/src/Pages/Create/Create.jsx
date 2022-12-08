import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
} from "@chakra-ui/react";

//nombre
//descripción
//categoría
//marca
//tac
//imagen
//precio
//stock
//disponibilidad

const Create = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const Category = useSelector((state) => state.Category);
  const brand = useSelector((state) => state.brand);

  const [input, setInput] = useState({
    name: "",
    description: "",
    Category: [],
    brand: [],
    tacc: false,
    img: "",
    price: null,
    stock: null,
  });

  /* useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
  }, []);
 */
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectCategories(e) {
    if (!input.Category.includes(e.target.value)) {
      setInput({
        ...input,
        Category: [...input.Category, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          Category: [...input.Category, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
      });
    }
  }

  function handleDeleteCategories(e) {
    setInput({
      ...input,
      Category: input.Category.filter((param) => param !== e),
    });
  }

  function handleSelectBrand(e) {
    if (!input.brand.includes(e.target.value)) {
      setInput({
        ...input,
        brand: [...input.brand, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    console.log(input);
    e.preventDefault();
    let crear = {
      name: input.name,
      description: input.description,
      Category: input.Category,
      brand: input.brand,
      tacc: input.tacc,
      img: input.img,
      price: input.price,
      stock: input.stock,
    };
  }

  return (
    <form action="submit" onSubmit={(e) => handleSubmit(e)}>
      <Stack spacing={2}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Type a Description"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <select onChange={(e) => handleSelectCategories(e)}>
            <option>Select Category</option>
            {Category?.map((g) => {
              console.log(g);
              return <option value={g.name}>{g.name}</option>;
            })}
          </select>
          <div>
            {/* DELETE CATEGORY */}
            {input.Category?.map((e) => {
              return (
                <>
                  <div>
                    <div>{e}</div>
                    <button onClick={() => handleDeleteCategories(e)}>X</button>
                  </div>
                </>
              );
            })}{" "}
          </div>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Brand</FormLabel>
          <select onChange={(e) => handleSelectBrand(e)}>
            <option>Select Brand</option>
            {brand?.map((g) => {
              return <option value={g.name}>{g.name}</option>;
            })}
          </select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel as="legend">Tacc</FormLabel>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px">
              <Radio value="Sasuke">Yes</Radio>
              <Radio value="Nagato">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Img URL</FormLabel>
          <Input
            type="text"
            value={input.img}
            name="img"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={input.price}
            name="price"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            value={input.stock}
            name="stock"
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" colorScheme="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Create;
