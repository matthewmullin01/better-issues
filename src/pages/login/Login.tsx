import firebase from "firebase";
import { FunctionComponent, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../../utils/hooks/auth.hook";

export interface LoginProps {}

export const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { login } = useContext(AuthContext);

  return <Button onClick={login}>Login with Github</Button>;
};
