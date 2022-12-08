import React from 'react';
import { useState, useEffect } from "react";
import { Formik } from 'formik'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Input,
    InputLeftAddon,
    InputGroup,
    Icon,
    InputLeftElement,
    Button,
    RadioGroup,
    HStack,
    Radio,
    Select,
    EditablePreview,
    EditableTextarea,
    Editable,
    Textarea,
  } from '@chakra-ui/react'


//nombre
//descripción
//categoría
//marca
//tac
//imagen
//precio
//stock
//disponibilidad 

function validate(input) {
    let errors = {}

    if (!input.name) {
        errors.name = "Name is required";
      } else if (input.name.length > 50) {
        errors.name = "Name is too long";
      }
  
      if (!input.description) {
        errors.description = "Description is required ";
      } else if (input.description.length > 1500) {
        errors.description = "Description is too long. (Max = 1500 characters)";
      }
  
      if (!input.rating) {
        errors.rating = "Rating is required";
      } else if (input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating must range between 0 to 5";
      }
  
      if (!input.released) {
        errors.released = "Date of release is required";
      } else if (input.released.length < 10) {
        errors.released = "Date of release is to long";
      }
      if (!input.img) {
        errors.img = "Image URL is required";
      }
  
      if (!input.genre[0]) {
        errors.genre = "At least one Genre is required ";
      }
  
      if (!input.platforms[0]) {
        errors.platforms = "At least one Platform is required";
      }
  
      return errors;
}

const Create = () => {
    const [ errors, setErrors ] = useState({})

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        category: [],
        brand: [],
        tac: '',
        img: "",
        price: [],
        stock: [],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <form action='submit'>
            <Stack spacing={2}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type='' />
                </FormControl>
                
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea  placeholder='Type a Description'>
                        <Input type='' />
                    </Textarea>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder='Select a Category'>
                        <option>Category 2</option>
                        <option>Category 1</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Brand</FormLabel>
                    <Select placeholder='Select a Brand'>
                        <option>Brand 2</option>
                        <option>Brand 1</option>
                    </Select>
                </FormControl>
                
                <FormControl isRequired>
                    <FormLabel as='legend'>Tacc</FormLabel>
                    <RadioGroup defaultValue='Itachi'>
                        <HStack spacing='24px'>
                        <Radio value='Sasuke'>Yes</Radio>
                        <Radio value='Nagato'>No</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Img URL</FormLabel>
                    <Input type='url' placeholder='https://example.com' />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input type='number' />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Stock</FormLabel>
                    <Input type='number' />
                </FormControl>
                
                <Button type='submit' colorScheme="primary" >Submit 🗿</Button>
            </Stack>
        </form>
    )
    
  }
  
  export default Create