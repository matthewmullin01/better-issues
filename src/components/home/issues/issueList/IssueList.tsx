import { Box, Divider } from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GitHubIssue, GitHubAPI } from "../../../../api/github";
import { AuthContext } from "../../../../utils/hooks/auth.hook";
import { Paginator } from "../../../shared/paginator/Paginator";
import { Skeleton } from "../../../shared/skeleton/Skeleton";

import { IssueItem } from "../issueItem/IssueItem";

export interface IssueListProps {}

export const IssueList: FunctionComponent<IssueListProps> = (props: IssueListProps) => {
  const { oAuthToken } = useContext(AuthContext);
  let { ownerId, repoId } = useParams<{ ownerId: string; repoId: string; issueId?: string }>();
  const [issues, setIssues] = useState<GitHubIssue[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const history = useHistory();
  const pageLimit = 10;
  const hasNext = (issues?.length || 0) === pageLimit;
  const hasPrev = page > 1;

  const github = new GitHubAPI(oAuthToken!);

  useEffect(() => {
    getIssues();
  }, [page]);

  const getIssues = async () => {
    setLoading(true);
    const issues = await github.getIssues(ownerId, repoId, page, pageLimit);
    setIssues(issues);
    setLoading(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const issueClicked = (issue: GitHubIssue) => {
    history.push(`/repos/${ownerId}/${repoId}/issues/${issue.number}`);
  };

  const issueList = issues?.map((issue) => (
    <Box key={issue.id}>
      <IssueItem onClick={() => issueClicked(issue)} key={issue.id} issue={issue}></IssueItem>
      <Divider />
    </Box>
  ));

  return (
    <>
      <Skeleton isLoading={loading}>
        {issueList}
        <Paginator onNext={nextPage} onPrev={prevPage} hasNext={hasNext} hasPrev={hasPrev} />
      </Skeleton>
    </>
  );
};
