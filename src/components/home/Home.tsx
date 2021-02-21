import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { Repos } from "./repos/Repos";
import { Header } from "./navbar/Navbar";
import { Issues } from "./issues/Issues";
import { Container } from "@chakra-ui/react";

export interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
  let { path } = useRouteMatch();

  return (
    <>
      <Header />

      <Container maxW="6xl" marginTop="20">
        <Switch>
          <Route path={`${path}repos/:ownerId/:repoId/issues`} component={Issues}></Route>
          <Route path={`${path}repos`} component={Repos}></Route>
          <Route path={`${path}`}>
            <Redirect to="/repos"></Redirect>
          </Route>
        </Switch>
      </Container>
    </>
  );
};
