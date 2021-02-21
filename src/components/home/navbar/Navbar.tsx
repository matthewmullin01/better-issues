import React, { FunctionComponent, useContext } from "react";
import { Box, Heading, Flex, Button, useColorMode, IconButton } from "@chakra-ui/react";
import { AuthContext } from "../../../utils/hooks/auth.hook";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// const MenuItems = ({ children }: any) => (
//   <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
//     {children}
//   </Text>
// );

export interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="#161b22" color="white" {...props}>
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Better Issues
        </Heading>
      </Flex>

      <Flex align="center" justify="end">
        {colorMode === "dark" ? (
          <IconButton variant="outline" onClick={toggleColorMode} aria-label="Light Mode" icon={<SunIcon />} />
        ) : (
          <IconButton variant="outline" onClick={toggleColorMode} aria-label="Dark Mode" icon={<MoonIcon />} />
        )}

        <Button ml="4" bg="transparent" onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};
