import { Box, Heading, Tag, Text, Flex, CloseButton } from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useHistory, useParams } from "react-router-dom";
import { GitHubAPI, GitHubIssue } from "../../../../api/github";
import { AuthContext } from "../../../../utils/hooks/auth.hook";
import { Skeleton } from "../../../shared/skeleton/Skeleton";
import { format } from "date-fns";

export interface IssueDetailsProps {}

export const IssueDetails: FunctionComponent<IssueDetailsProps> = (props: IssueDetailsProps) => {
  const { oAuthToken } = useContext(AuthContext);
  let { ownerId, repoId, issueId } = useParams<{ ownerId: string; repoId: string; issueId: string }>();
  const github = new GitHubAPI(oAuthToken!);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [issue, setIssue] = useState<GitHubIssue | null>(null);

  useEffect(() => {
    getIssue();
    // eslint-disable-next-line
  }, []);

  const getIssue = async () => {
    setLoading(true);
    const issue = await github.getIssue(ownerId, repoId, issueId);
    setLoading(false);
    setIssue(issue);
  };

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
    <Box mt="6">
      <Skeleton isLoading={loading || !issue}>
        {issue && (
          <Box>
            <Flex align="center" justify="space-between">
              <Heading as="h2" size="md">
                {issue.title}
                <Text ml="2" opacity="0.5" fontWeight="normal" display="inline">
                  # {issue.number}
                </Text>
              </Heading>

              <CloseButton opacity="0.3" onClick={() => history.push(`/repos/${ownerId}/${repoId}/issues`)} />
            </Flex>

            <Flex mt="2" align="center" justify="start" color="#777">
              <Text mt="1" fontSize="xs">
                <Tag mr="1" size="sm" colorScheme={getTagColor(issue.state)}>
                  {issue.state}
                </Tag>
                <b>#{issue.number}</b> was created by <span style={{ opacity: "0.5" }}> {issue.user.login} </span>
                on {format(new Date(issue.created_at), "dd MMM yyyy")}
              </Text>
            </Flex>

            <Box mt="4" color="#777" fontSize="0.75em">
              <ReactMarkdown renderers={ChakraUIRenderer()} source={issue.body} />
            </Box>
          </Box>
        )}
      </Skeleton>
    </Box>
  );
};
