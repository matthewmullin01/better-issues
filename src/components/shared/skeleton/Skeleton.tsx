import React, { FunctionComponent } from "react";
import { SkeletonText } from "@chakra-ui/react";

export interface SkeletonProps {
  isLoading: boolean;
  children?: any;
}

export const Skeleton: FunctionComponent<SkeletonProps> = (props: SkeletonProps) => {
  return (
    <>
      <SkeletonText noOfLines={10} spacing="4" isLoaded={!props.isLoading}>
        {props.children}
      </SkeletonText>
    </>
  );
};
