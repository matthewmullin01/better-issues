import React, { FunctionComponent } from "react";
import { Text, Flex, Heading } from "@chakra-ui/react";

export interface SplashProps {}

export const Splash: FunctionComponent<SplashProps> = (props: SplashProps) => {
  return (
    <>
      <Flex flexDirection="column" align="center" justify="center" height="100vh" color="#888">
        <Heading textAlign="center" as="h1" size="sm" fontWeight="bold">
          "We don't make mistakes - we just have happy accidents"
        </Heading>
        <Text m="2" fontStyle="italic">
          Bob Ross
        </Text>
      </Flex>
    </>
  );
};
