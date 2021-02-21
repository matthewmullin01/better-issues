import React, { FunctionComponent } from "react";
import { Switch, Route, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { IssueDetails } from "./issueDetails/IssueDetails";
import { IssueList } from "./issueList/IssueList";

export interface IssuesProps {}

export const Issues: FunctionComponent<IssuesProps> = (props: IssuesProps) => {
  let { path } = useRouteMatch();
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  let history = useHistory();
  let { ownerId, repoId } = useParams<{ ownerId: string; repoId: string; issueId: string }>();

  const SideBySide = (
    <Flex mt="10" align="start" justifyContent="center">
      <Container margin="unset">
        <IssueList />
      </Container>

      <Switch>
        <Route
          path={`${path}/:issueId`}
          render={(props) => {
            return (
              <Container margin="unset">
                <IssueDetails {...props} key={props.match.params.issueId} />
              </Container>
            );
          }}
        />
      </Switch>
    </Flex>
  );

  const SeparateRoutes = (
    <Flex mt="10" align="start" justifyContent="center">
      <Switch>
        <Route
          path={`${path}/:issueId`}
          render={(props) => {
            return (
              <Container margin="unset">
                <IssueDetails {...props} key={props.match.params.issueId} />
              </Container>
            );
          }}
        />
        <Route
          path={`${path}/`}
          render={(props) => {
            return (
              <Container margin="unset">
                <IssueList />
              </Container>
            );
          }}
        />
      </Switch>
    </Flex>
  );

  return (
    <>
      <Flex align="center" justify="center">
        <Box>
          <Heading as="h5" size="sm" fontWeight="medium" opacity="0.3">
            {ownerId}
          </Heading>

          <Flex align="center" justify="center">
            <Heading as="h2" size="lg">
              {repoId}
            </Heading>
            <Button size="sm" ml="5" variant="outline" onClick={() => history.push("/repos")}>
              Change
            </Button>
          </Flex>
        </Box>
      </Flex>

      {isMobile ? SeparateRoutes : SideBySide}
    </>
  );
};
