import { createContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export interface AuthContextData {
  currentUser?: firebase.User | null;
  oAuthToken?: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  initializing: boolean;
}

export const authContextDefaultValue: AuthContextData = {
  currentUser: null,
  oAuthToken: null,
  login: () => new Promise(null as any),
  logout: () => new Promise(null as any),
  initializing: true,
};

export const AuthContext = createContext<AuthContextData>(authContextDefaultValue);

// Hook that wraps Authentication helper functions and logged in user
export function useAuthContext(): AuthContextData {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();
  const [oAuthToken, setOAuthToken] = useState<string | null>();
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setOAuthToken(localStorage.getItem("token"));
      } else {
        localStorage.removeItem("token");
        setOAuthToken(null);
        setCurrentUser(null);
      }
      setInitializing(false);
    });
  }, []);

  const login = async () => {
    const userCredentials = await loginWithGithub();
    const token = (userCredentials.credential as any).accessToken;
    if (!token) throw new Error("No Github oAuth Token returned from login. Are you using the correct auth provider?");
    if (!userCredentials.user) throw new Error("User not returned from login");
    setCurrentUser(userCredentials.user);
    localStorage.setItem("token", token);
    setOAuthToken(token);
  };

  const loginWithGithub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();

    provider.addScope("repo");
    return firebase.auth().signInWithPopup(provider);
  };

  const logout = async () => {
    firebase.auth().signOut();
  };

  return {
    currentUser,
    oAuthToken,
    login,
    logout,
    initializing,
  };
}
