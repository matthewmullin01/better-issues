import { Button, Container, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GitHubIssue, GitHubAPI } from "../../../api/github";
import { AuthContext } from "../../../utils/hooks/auth.hook";
import { IssueDetails } from "./issueDetails/IssueDetails";
import { IssueItem } from "./issueItem/IssueItem";

export interface IssuesProps {}

export const Issues: FunctionComponent<IssuesProps> = (props: IssuesProps) => {
  const { oAuthToken } = useContext(AuthContext);
  let { ownerId, repoId, issueId } = useParams<{ ownerId: string; repoId: string; issueId?: string }>();
  const [issues, setIssues] = useState<GitHubIssue[] | null>();
  const [selectedIssue, setSelectedIssue] = useState<GitHubIssue | null>(null);
  const [page, setPage] = useState<number>(1);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [issueLoading, setIssueLoading] = useState<boolean>(true);
  const history = useHistory();
  const pageLimit = 10;
  const hasNext = (issues?.length || 0) === pageLimit;
  const hasPrev = page > 1;

  const github = new GitHubAPI(oAuthToken!);

  useEffect(() => {
    getIssues();
  }, [page]);

  const getIssues = async () => {
    setListLoading(true);
    if (issueId && !selectedIssue) {
      getIssue(issueId);
    }
    const issues = await github.getIssues(ownerId, repoId, page, pageLimit);
    setIssues(issues);
    setListLoading(false);
  };

  const getIssue = async (issueId: string) => {
    setIssueLoading(true);
    const issue = await github.getIssue(ownerId, repoId, issueId);
    if (!issue) throw new Error("Issue not found " + issueId);
    setIssueLoading(false);
    setSelectedIssue(issue);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const issueClicked = (issue: GitHubIssue) => {
    console.log(issue);
    history.push(`/repos/${ownerId}/${repoId}/issues/${issue.number}`);
    setSelectedIssue(issue);
  };

  const issueList = issues?.map((issue) => <IssueItem onClick={() => issueClicked(issue)} key={issue.id} issue={issue}></IssueItem>);

  const pageButton = (
    <>
      <Button disabled={!hasPrev} onClick={prevPage}>
        Prev
      </Button>
      <Button disabled={!hasNext} onClick={nextPage}>
        Next
      </Button>
    </>
  );

  const Loader = (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );

  return (
    <>
      <>
        <Flex align="start" justifyContent="center">
          <Container margin="unset">
            {listLoading ? (
              Loader
            ) : (
              <div>
                {issueList}
                {pageButton}
              </div>
            )}
          </Container>

          {issueLoading
            ? Loader
            : selectedIssue && (
                <Container margin="unset">
                  <IssueDetails issue={selectedIssue}></IssueDetails>
                </Container>
              )}
        </Flex>
      </>
    </>
  );
};
