import React from "react";
import "./App.css";
import { Login } from "./components/login/Login";
import { AuthContext, useAuthContext } from "./utils/hooks/auth.hook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Spinner } from "@chakra-ui/react";
import { Home } from "./components/home/Home";

function App() {
  const authContext = useAuthContext();

  if (!authContext.currentUser) {
    console.log("Not Logged in");
  } else {
    console.log("Logged in");
  }

  return authContext.initializing ? (
    <Spinner></Spinner>
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
