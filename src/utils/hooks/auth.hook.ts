import { createContext, useState } from "react";
import firebase from "firebase";

export interface AuthContextData {
  currentUser?: firebase.User | null;
  oAuthToken?: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const authContextDefaultValue: AuthContextData = {
  currentUser: null,
  oAuthToken: null,
  login: () => new Promise(null as any),
  logout: () => new Promise(null as any),
};

export const AuthContext = createContext<AuthContextData>(authContextDefaultValue);

// Hook that wraps Authentication helper functions and logged in user
export function useAuthContext(): AuthContextData {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();
  const [oAuthToken, setOAuthToken] = useState<string | null>();

  const login = async () => {
    const userCredentials = await loginWithGithub();
    const token = (userCredentials.credential as any).accessToken;
    if (!token) throw new Error("No Github oAuth Token returned from login. Are you using the correct auth provider?");
    if (!userCredentials.user) throw new Error("User not returned from login");
    setOAuthToken(token);
    setCurrentUser(userCredentials.user);
  };

  const loginWithGithub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setOAuthToken(null);
      setCurrentUser(null);
    } catch (error) {
      throw new Error("Failed to logout");
    }
  };

  return {
    currentUser,
    oAuthToken,
    login,
    logout,
  };
}
