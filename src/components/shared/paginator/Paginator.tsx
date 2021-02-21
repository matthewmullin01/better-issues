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

  const extendedOnNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNext();
  };

  const extendedOnPrev = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPrev();
  };

  return (
    <>
      <Flex mt="8" mb="8">
        <Button disabled={!hasPrev} onClick={extendedOnPrev}>
          Prev
        </Button>
        <Button ml="2" disabled={!hasNext} onClick={extendedOnNext}>
          Next
        </Button>
      </Flex>
    </>
  );
};
