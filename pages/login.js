import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  useToast,
  Input,
  Button,
  useColorModeValue
} from "@chakra-ui/react";
import { loginApi } from "../api/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import useAuth from "../hooks/useAuth";

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
        setIsLoading(true);
        const response = await loginApi(formData);
        if (!response.success) {
          toast({
            title: `${response.error}`,
            status: "error",
            position: "top-left",
            isClosable: true,
            duration: 1000,
          });
        } else {
          login(response.accessToken);
          router.push("/dashboard");
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
            <Flex direction="column" backgroundColor={formBackground} p={20} rouded={6}>
                <Heading mb={6} align="center">Login</Heading>
                <Input 
                    placeholder="demo@demo.cl" 
                    variant="flushed" 
                    mb={3} 
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    isInvalid={formik.errors.email}
                    name="email"
                    />
                <Input placeholder="********" 
                       variant="flushed" 
                       mb={6} 
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.password}
                       isInvalid={formik.errors.password}
                      name="password"
                       />
              <Button isLoading={isLoading} colorScheme="orange" type="submit">Login</Button>
              <Flex align="center" mt={2}>
                    Already got an account?<Link href="/register">Register</Link> 
              </Flex>
            </Flex>
        </form>
    </Flex>
    )
}


function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required(true),
    password: Yup.string().required(true)
  };
}