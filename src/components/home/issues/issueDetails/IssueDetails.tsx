import { Stack } from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useParams } from "react-router-dom";
import { GitHubAPI, GitHubIssue } from "../../../../api/github";
import { AuthContext } from "../../../../utils/hooks/auth.hook";
import { Skeleton } from "../../../shared/skeleton/Skeleton";

export interface IssueDetailsProps {}

export const IssueDetails: FunctionComponent<IssueDetailsProps> = (props: IssueDetailsProps) => {
  const { oAuthToken } = useContext(AuthContext);
  let { ownerId, repoId, issueId } = useParams<{ ownerId: string; repoId: string; issueId: string }>();
  const github = new GitHubAPI(oAuthToken!);
  const [loading, setLoading] = useState<boolean>(true);
  const [issue, setIssue] = useState<GitHubIssue | null>(null);

  useEffect(() => {
    getIssue();
  }, []);

  const getIssue = async () => {
    setLoading(true);
    const issue = await github.getIssue(ownerId, repoId, issueId);
    setLoading(false);
    setIssue(issue);
  };

  return (
    <>
      {loading || !issue ? (
        <Skeleton />
      ) : (
        <div>
          <h1>{issue.title}</h1>
          <small>{issue.description}</small>
          <small>{issue.state}</small>
          {/* These are arrays */}
          {/* <small>{issue.assignees}</small>
      <small>{issue.labels}</small> */}
          <div>
            <ReactMarkdown renderers={ChakraUIRenderer()} source={issue.body} />
          </div>
        </div>
      )}
    </>
  );
};
