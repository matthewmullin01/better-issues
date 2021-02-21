import { FunctionComponent, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../../utils/hooks/auth.hook";
import { useHistory } from "react-router-dom";

export interface LoginProps {}

export const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const loginClicked = async () => {
    await login();
    history.push("/");
  };

  return <Button onClick={loginClicked}>Login with Github</Button>;
};
