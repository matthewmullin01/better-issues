import { useContext } from "react";
import { AuthContext } from "./hooks/auth.hook";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ children, ...rest }: any) {
  let { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
