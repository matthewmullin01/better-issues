import { Box, Text, Flex, Heading, Tag, Link } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { GitHubIssue } from "../../../../api/github";

export interface IssueItemProps {
  issue: GitHubIssue;
  onClick: (issue: GitHubIssue) => void;
}

export const IssueItem: FunctionComponent<IssueItemProps> = (props: IssueItemProps) => {
  const { issue, onClick } = props;

  const getTagColor = (state: string) => {
    switch (state) {
      case "open":
        return "orange";
      case "closed":
        return "green";
      default:
        return "orange";
    }
  };

  return (
    <Box mt="3" mb="3" p="2">
      <Heading mt="2" as="h5" size="sm">
        <Link onClick={() => onClick(issue)} color="teal.500">
          {issue.title}
        </Link>
      </Heading>

      <Text mt="1" fontSize="xs">
        {issue.description}
      </Text>

      <Flex align="center" justify="start">
        <Text mt="1" fontSize="xs">
          <Tag mr="1" size="sm" colorScheme={getTagColor(issue.state)}>
            {issue.state}
          </Tag>
          <b>#{issue.number}</b> was created by <span style={{ opacity: "0.5" }}> {issue.user.login} </span>
          on {format(new Date(issue.created_at), "dd MMM yyyy")}
        </Text>
      </Flex>
    </Box>
  );
};
