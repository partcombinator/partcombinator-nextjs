import React, { useState } from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  useToast,
  Input,
  Button,
  useColorModeValue
} from "@chakra-ui/react";
import { changePassword } from "../api/auth";
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
  const { logout, auth, setReloadUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
        setIsLoading(true);
        const id = auth.idUser;
        const oldpassword = formData.oldpassword;
        const newpassword = formData.password;
        const response = await changePassword(id, oldpassword, newpassword);
        if (response === null ) {
          toast({
            title: `Respose Null`,
            status: "error",
            position: "top-left",
            isClosable: true,
            duration: 1000,
          });
        }
        
        else if (!response.success) {
          toast({
            title: `${response.error}`,
            status: "error",
            position: "top-left",
            isClosable: true,
            duration: 1000,
          });
        } else {
          logout();
          toast({
            title: `The password was changed correctly`,
            status: "success",
            position: "top-left",
            isClosable: true,
            duration: 1000,
          });
        }
        
      resetForm({ values: "" });
      setIsLoading(false);
    },
  });


  if (!auth) {
    router.push("login");
    return null;
  }

  return (
        <Flex height="100vh" align="center" justifyContent="center">
          <form onSubmit={formik.handleSubmit}>
            <Link href="/">
                <Heading mb={6} align="center" color={'orange'}>{process.env.NAME_APP}</Heading>
            </Link>
            <Flex direction="column" backgroundColor={formBackground} p={20} rouded={6}>
                <Heading mb={6} align="center">Change Password</Heading>
                
                <Input placeholder="Old Password" 
                       variant="flushed" 
                       mb={6} 
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.oldpassword}
                       isInvalid={formik.errors.oldpassword}
                      name="oldpassword"
                       />


                <Input placeholder="New Password" 
                       variant="flushed" 
                       mb={6} 
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.password}
                       isInvalid={formik.errors.password}
                      name="password"
                       />

                <Input placeholder="New Password" 
                       variant="flushed" 
                       mb={6} 
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.rpassword}
                       isInvalid={formik.errors.rpassword}
                      name="rpassword"
                       />
              <Button isLoading={isLoading} colorScheme="orange" type="submit">Change</Button>
            </Flex>
        </form>
    </Flex>
    )
}


function initialValues() {
  return {
    oldpassword: "",
    password: "",
    rpassword: "",
  };
}

function validationSchema() {
  return {
    oldpassword: Yup.string().required(true),
    password: Yup.string().required(true),
    rpassword: Yup.string().required(true),
  };
}