import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { Issues } from "./issues/Issues";
import { Repos } from "./repos/Repos";
import { Header } from "./navbar/Navbar";

function App() {
  let { path } = useRouteMatch();

  console.log({ path });

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path={`${path}repos/:ownerId/:repoId/issues/:issueId?`}>
            <Issues />
          </Route>
          <Route path={`${path}repos`}>
            <Repos />
          </Route>
          <Route path={`${path}`}>
            <Redirect to="/repos"></Redirect>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
