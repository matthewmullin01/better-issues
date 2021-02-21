import { testHook } from "../../testUtils/test.hook";
import { AuthContextData, useAuthContext } from "./auth.hook";
import firebase from "firebase";
import { firebaseAuthMock, firebaseProviderMock } from "../../testUtils/firebase.mock";

// @ts-ignore
firebase.auth = firebaseAuthMock;
// @ts-ignore
firebase.auth.GithubAuthProvider = firebaseProviderMock;

let authContext: AuthContextData = null as any;
beforeEach(() => {
  testHook(() => {
    authContext = useAuthContext();
  });
});

test("Hook mounts into component correctly", () => {
  expect(authContext).toBeTruthy();
});

test("User falsy initially", () => {
  expect(authContext.currentUser).toBeFalsy();
});
