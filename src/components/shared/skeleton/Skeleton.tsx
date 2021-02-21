import React, { FunctionComponent } from "react";
import { Stack, Skeleton as ChakraSkeleton } from "@chakra-ui/react";

export interface SkeletonProps {}

export const Skeleton: FunctionComponent<SkeletonProps> = (props: SkeletonProps) => {
  return (
    <>
      <Stack>
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
        <ChakraSkeleton height="20px" />
      </Stack>
    </>
  );
};
