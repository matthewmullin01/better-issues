import React from "react";
import "./App.css";
import { Login } from "./pages/login/Login";
import { AuthContext, useAuthContext } from "./utils/hooks/auth.hook";

function App() {
  const authContext = useAuthContext();

  if (!authContext.currentUser) {
    console.log("Not Logged in");
  } else {
    console.log("Logged in");
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Login />
    </AuthContext.Provider>
  );
}

export default App;
