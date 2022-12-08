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