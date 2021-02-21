import { Box, Text, Flex, Heading, Tag, Button } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React, { FunctionComponent } from "react";
import { GitHubRepo } from "../../../../api/github";

export interface RepoItemProps {
  repo: GitHubRepo;
  onClick: (repo: GitHubRepo) => void;
}

export const RepoItem: FunctionComponent<RepoItemProps> = (props: RepoItemProps) => {
  const { repo, onClick } = props;

  return (
    <Box mt="3" mb="3" p="2">
      <Heading as="h5" size="xs" fontWeight="medium" opacity="0.3">
        {repo.owner.login}
      </Heading>

      <Heading mt="2" as="h5" size="sm">
        <Button onClick={() => onClick(repo)} colorScheme="teal" variant="link">
          {repo.name}
        </Button>
      </Heading>

      <Text mt="1" fontSize="xs">
        {repo.description}
      </Text>

      <Flex mt="4" align="center" justify="start">
        {repo.language && (
          <Tag mr="2" size="sm">
            {repo.language}
          </Tag>
        )}
        <Tag mr="2" size="sm">
          {repo.private ? "Private" : "Public"}
        </Tag>
        <Text mr="2" fontSize="xs">
          Updated {formatDistance(new Date(repo.updated_at), new Date())}
        </Text>
      </Flex>
    </Box>
  );
};
