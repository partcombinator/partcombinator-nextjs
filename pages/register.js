import React, { useState } from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  useToast,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { addUser } from "../api/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'

export default function Register() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
      setIsLoading(true);
      if (formData.userPassword !== formData.userRepeatPassword) {
        toast({
          title: `The password are not the same`,
          status: "error",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
      } else {
        const response = await addUser(formData);
        if (!response) {
          toast({
            title: `Error at create user`,
            status: "error",
            position: "top-left",
            isClosable: true,
            duration: 1000,
          });
        } else {
          router.push("/login");
        }
      }
      resetForm({ values: "" });
      setIsLoading(false);
    },
  });

  return (
    <Flex height="100vh" align="center" justifyContent="center">
        
      <form onSubmit={formik.handleSubmit}>
      <Link href="/">
                <Heading mb={6} align="center" color={'orange'}>{process.env.NAME_APP}</Heading>
            </Link>
        <Flex 
          direction="column"
          backgroundColor={formBackground}
          p={20}
          rouded={6}
          
        >
          <Heading mb={6} >Sign Up</Heading>

          <Input
            placeholder="demo@demo.cl"
            variant="flushed"
            mb={3}
            type="email"
            onChange={formik.handleChange}
            value={formik.values.userEmail}
            name="userEmail"
            isInvalid={formik.errors.userEmail}
          />
          <Input
            placeholder="password"
            variant="flushed"
            mb={6}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.userPassword}
            isInvalid={formik.errors.userPassword}
            name="userPassword"
          />
          <Input
            placeholder="password"
            variant="flushed"
            mb={6}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.userRepeatPassword}
            isInvalid={formik.errors.userRepeatPassword}
            name="userRepeatPassword"
          />
          <Button colorScheme="orange" type="submit">
            Register
          </Button>

          <Flex align="center" justifyContent="center" mt={2}>
                    Already an account? <Link href="/login">Login</Link>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

function initialValues() {
  return {
    userEmail: "",
    userPassword: "",
    userRepeatPassword: "",
  };
}

function validationSchema() {
  return {
    userEmail: Yup.string().required(true),
    userPassword: Yup.string().required(true).min(8),
    userRepeatPassword: Yup.string().required(true).min(8),
  };
}