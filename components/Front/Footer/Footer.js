import React from "react";
import Link from "next/link";
import {
  Container,
  Stack,
  Text,
  Box,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

export default function Footer() {
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
        {children}
      </Text>
    );
  };

  return (
    <footer>
      <Box
        width="100%"
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Link href={"#"}>Text 1</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>Text 2</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Legal</ListHeader>
              <Link href={"#"}>Text 3</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Legal</ListHeader>
              <Link href={"#"}>Text 4</Link>
            </Stack>
          </SimpleGrid>
        </Container>

        <Box
          centercontent
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            
            align={{ md: "center" }}
          >
            <Text>© 2021 Marlon Falcon,  All rights reserved</Text>
            <Stack direction={"row"} spacing={6}></Stack>
          </Container>
        </Box>
      </Box>
    </footer>
  );
}
