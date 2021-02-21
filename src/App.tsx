import React, { useEffect, useState } from "react";
import { Login } from "./components/login/Login";
import { AuthContext, useAuthContext } from "./utils/hooks/auth.hook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Home } from "./components/home/Home";
import { Splash } from "./components/shared/splash/Splash";

function App() {
  const authContext = useAuthContext();
  const [splashing, setSplashing] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashing(false); // Iffy UX. Worth considering removing this
    }, 1700);
  }, []);

  return authContext.initializing || splashing ? (
    <Splash />
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
