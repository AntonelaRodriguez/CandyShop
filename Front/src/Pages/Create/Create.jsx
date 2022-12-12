import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getAllProducts,
  postProduct,
  getAllCategories,
} from "../../redux/actions/actions";

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
  const category = useSelector((state) => state.categories);
  const brand = useSelector((state) => state.brands);
  // Cloudinary
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "images");
    const { data: file } = await axios.post(
      "https://api.cloudinary.com/v1_1/dev3snn9g/image/upload",
      data
    );

    setImage(file.secure_url);

    /* console.log(file); */
  };

  const [input, setInput] = useState({
    name: "",
    description: "",
    category: [],
    brand: "",
    tacc: "",
    price: null,
    stock: null,
  });

  /* useEffect(() => {
    dispatch(getcategory());
    dispatch(getBrand());
  }, []);
 */
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  function handleSelectCategories(e) {
    setInput({
      ...input,
      category: [...input.category, e.target.value],
    });
  }

  function handleDeleteCategories(e) {
    setInput({
      ...input,
      category: input.category.filter((param) => param !== e),
    });
  }

  function handleSelectBrand(e) {
    setInput({
      ...input,
      brand: [...input.brand, e.target.value],
    });
  }

  function handleSubmit(e) {
    console.log(input);
    e.preventDefault();
    let crear = {
      name: input.name,
      description: input.description,
      category: input.category,
      brand: input.brand,
      tacc: input.tacc === "True" ? true : false,
      image: image,
      price: Number(input.price),
      stock: Number(input.stock),
    };

    dispatch(postProduct(crear));
    setInput({
      name: "",
      description: "",
      category: [],
      brand: "",
      tacc: false,
      img: "",
      price: null,
      stock: null,
    });
    alert("Product created succesfully");
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
          <FormLabel>category</FormLabel>
          <select onChange={(e) => handleSelectCategories(e)}>
            <option>Select category</option>
            {category?.map((g) => {
              return <option value={g.name}>{g.name}</option>;
            })}
          </select>
          <div>
            {/* DELETE CATEGORY */}
            {input.category?.map((e) => {
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
          <select name="brand" onChange={(e) => handleChange(e)}>
            <option>Select Brand</option>
            {brand?.map((g) => {
              return <option value={g}>{g}</option>;
            })}
          </select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel as="legend">Tacc</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio name="tacc" onChange={(e) => handleChange(e)} value="True">
                Yes
              </Radio>
              <Radio
                name="tacc"
                onChange={(e) => handleChange(e)}
                value="False"
              >
                No
              </Radio>
            </HStack>
          </RadioGroup>
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

        <FormControl isRequired>
          <FormLabel htmlFor="file">Img URL</FormLabel>
          <Input
            id="fileInput"
            type="file"
            // value={image}
            name="file"
            onChange={(e) => uploadImage(e)}
          />
          <img src={image} alt="product pic" />
        </FormControl>

        <Button type="submit" colorScheme="primary">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Create;
