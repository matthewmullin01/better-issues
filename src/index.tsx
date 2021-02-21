import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import { ChakraProvider } from "@chakra-ui/react";

// Use your config values here.
firebase.initializeApp({
  apiKey: "AIzaSyCMKBMCRfDkp4RrSDHC_JKbadsuX5s4o_M",
  authDomain: "better-issues.firebaseapp.com",
  projectId: "better-issues",
  storageBucket: "better-issues.appspot.com",
  messagingSenderId: "193364983508",
  appId: "1:193364983508:web:84ffaed3f6e744edbe0541",
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
