import { Box, Container, Divider, Flex, Heading, useToast } from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GitHubAPI, GitHubRepo } from "../../../api/github";
import { AuthContext } from "../../../utils/hooks/auth.hook";
import { Paginator } from "../../shared/paginator/Paginator";
import { Skeleton } from "../../shared/skeleton/Skeleton";
import { RepoItem } from "./repoItem/RepoItem";

export interface ReposProps {}

export const Repos: FunctionComponent<ReposProps> = () => {
  const { oAuthToken } = useContext(AuthContext);
  const [repos, setRepos] = useState<GitHubRepo[] | null>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const pageLimit = 10;
  const hasNext = (repos?.length || 0) === pageLimit;
  const toast = useToast();
  const hasPrev = page > 1;

  const github = new GitHubAPI(oAuthToken!);

  useEffect(() => {
    getRepos();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRepos();
    // eslint-disable-next-line
  }, [page]);

  const getRepos = async () => {
    try {
      setLoading(true);
      const repos = await github.getRepos(page, pageLimit);
      setRepos(repos);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error getting repositories",
        description: `Something went wrong getting your repositories. Try Reloading or Logging back in`,
        status: "error",
      });
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const repoClicked = (repo: GitHubRepo) => {
    history.push(`repos/${repo.owner.login}/${repo.name}/issues`);
  };

  const repoList = repos?.map((repo) => (
    <Box key={repo.id}>
      <RepoItem onClick={() => repoClicked(repo)} key={repo.id} repo={repo}></RepoItem>
      <Divider />
    </Box>
  ));

  return (
    <>
      <Flex align="center" justify="center">
        <Heading as="h2" size="lg">
          Your Repositories
        </Heading>
      </Flex>

      <Container mt="8">
        <Skeleton isLoading={loading}>
          {repoList}
          <Paginator onNext={nextPage} onPrev={prevPage} hasNext={hasNext} hasPrev={hasPrev} />
        </Skeleton>
      </Container>
    </>
  );
};
