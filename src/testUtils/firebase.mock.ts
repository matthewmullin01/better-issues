export const firebaseAuthMock = () => {
  const mAuth = { signInWithRedirect: jest.fn() };
  return {
    onAuthStateChanged: jest.fn(),
    signInWithPopup: () => ({
      credential: {
        accessToken: "test",
      },
    }),
    Auth: jest.fn(() => mAuth),
  };
};

export const firebaseProviderMock = () => {
  return {
    addScope: jest.fn(),
  };
};
