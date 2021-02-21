import React from "react";
import { Login } from "./components/login/Login";
import { AuthContext, useAuthContext } from "./utils/hooks/auth.hook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Home } from "./components/home/Home";
import { Text, Flex, Heading } from "@chakra-ui/react";

function App() {
  const authContext = useAuthContext();

  if (!authContext.currentUser) {
    console.log("Not Logged in");
  } else {
    console.log("Logged in");
  }

  return authContext.initializing ? (
    <Flex flexDirection="column" align="center" justify="center" height="100vh" color="#888">
      <Heading as="h1" size="sm" fontWeight="bold">
        We don't make mistakes - we just have happy accidents
      </Heading>
      <Text m="2" fontStyle="italic">
        Bob Ross
      </Text>
    </Flex>
  ) : (
    <AuthContext.Provider value={authContext}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
