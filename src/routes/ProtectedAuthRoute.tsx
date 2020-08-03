import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuth, $auth } from "../features/Login";
import { useStore } from "effector-react";

const ProtectedAuthRoute = ({ login, redirectTo, onRender }: any) => {
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

  if (typeof auth.token !== "undefined") {
    return (
      <Redirect
        to={{
          pathname: redirectTo ? redirectTo : "/",
        }}
      />
    );
  } else {
    return <>{onRender}</>;
  }
};

export default connect(
  (store: any) => ({
    auth: store.auth,
  }),
  (dispatch) => ({
    login: (token: string) => dispatch({ type: "LOGIN", payload: { token } }),
  })
)(ProtectedAuthRoute);
