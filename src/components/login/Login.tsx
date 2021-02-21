import React, { FunctionComponent, useContext } from "react";
import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { AuthContext } from "../../utils/hooks/auth.hook";
import { useHistory } from "react-router-dom";

export interface LoginProps {}

export const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { login } = useContext(AuthContext);
  const toast = useToast();

  const history = useHistory();

  const loginClicked = async () => {
    try {
      await login();
      history.push("/");
    } catch (error) {
      toast({
        title: "Login Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex flexDirection="column" align="center" justify="center" height="100vh">
      <Heading as="h1" size="sm" fontWeight="bold">
        Welcome to
      </Heading>
      <Heading ml="1" mt="-0.2" as="h1" size="lg" letterSpacing={"-.1rem"}>
        Better Issues
      </Heading>
      <Button mt="8" onClick={loginClicked}>
        Login with Github
      </Button>
    </Flex>
  );
};
