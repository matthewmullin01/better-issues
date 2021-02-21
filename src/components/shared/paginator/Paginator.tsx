import React, { FunctionComponent } from "react";
import { Button, Flex } from "@chakra-ui/react";

export interface PaginatorProps {
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const Paginator: FunctionComponent<PaginatorProps> = (props: PaginatorProps) => {
  const { hasPrev, onPrev, hasNext, onNext } = props;
  return (
    <>
      <Flex mt="8" mb="8">
        <Button disabled={!hasPrev} onClick={onPrev}>
          Prev
        </Button>
        <Button ml="2" disabled={!hasNext} onClick={onNext}>
          Next
        </Button>
      </Flex>
    </>
  );
};
