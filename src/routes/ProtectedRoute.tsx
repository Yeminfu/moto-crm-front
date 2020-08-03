import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { setAuth, $auth } from "../features/Login";
import { useStore } from "effector-react";

export const ProtectedRoute = ({ store, login, pathToGo, onRender }: any) => {
  const token = localStorage.getItem("token");
  const auth = useStore<any>($auth);
  useEffect(() => {
    if (token !== null) {
      const user = localStorage.getItem("user");
      setAuth({
        token: localStorage.getItem("token"),
        user: JSON.parse(user ? user : ""),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof auth.token === "undefined" && token === null) {
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: { pathToGo: pathToGo },
        }}
      />
    );
  } else {
    return onRender;
  }
};
