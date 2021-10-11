import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

import {
  Flex,Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, MoonIcon } from "@chakra-ui/icons";
export default function Dashboard() {
    
  const router = useRouter();
  const { logout, auth, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);
  const { toggleColorMode } = useColorMode();

  if (!auth) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Container maxW={"5xl"}>
            <Stack
              textAlign={"center"}
              align={"center"}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 28 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Dashboard{" "}
                <Text as={"span"} color={"orange.400"}>
                  <Link href="/">PartCombinator</Link>
                </Text>
              </Heading>

              <Link href="/login" passHref>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}>
            Change Your Password
          </Button>
        </Link>

        <IconButton
          ml={3}
          px={6}
          _hover={{
            bg: "green.500",
          }}
          onClick={toggleColorMode}
          icon={<MoonIcon />}
        />

              <Text color={"gray.500"} maxW={"3xl"}>
                Marlon Falcon Hernandez
              </Text>
            </Stack>
          </Container>
        </main>
      </div>
    </>
  );
}
