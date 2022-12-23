import * as React from "react";
import { getToken } from "firebase/messaging";
import AuthContext from "contexts/AuthContext";
import { useMutation } from "react-query";
import axios from "axios";
import { messaging } from "../firebase/index";
// import { API_BASE_URL } from process.env

function useProvideAuth() {
  const [user, setUser] = React.useState(false);
  const [token, setToken] = React.useState(false);
  const mutation = useMutation((loginParams) => {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      username: loginParams.username,
      password: loginParams.password,
      device_type: "web",
      device_token: loginParams.device_token,
    });
  });

  const logoutMutation = useMutation(() => {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/users/logout`,
      {
        username: user.username,
        device_type: "web",
      },
      {
        headers: {
          token,
        },
      }
    );
  });

  const loginSuccess = async (params) => {
    let data = params.data.data;
    let { token, user } = data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const loginFailure = async (params) => {
    // console.log("Params ", params);
  };

  const fetchUser = async (token, userId) => {
    localStorage.setItem("token", token);
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/getbyid/${userId}`,
      {
        headers: {
          token,
        },
      }
    );
    if (response.status === 200) {
      const userData = response.data.data;
      setToken(token);
      setUser(userData);
    }
  };

  const signin = async (username, password) => {
    let loginObj = { username, password };
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
        });
        loginObj = { ...loginObj, device_token: fcmToken };
      } else {
        throw new Error("Permission Denied");
      }
    } catch (err) {
      loginObj = { ...loginObj, device_token: "No Token Found" };
    }
    const res = await mutation.mutateAsync(loginObj);
    // console.log("Res ", res);
    if (res.status === 200) {
      await loginSuccess(res);
    } else {
      await loginFailure(res);
    }
  };

  const signout = async (callback) => {
    await logoutMutation.mutateAsync();
    // console.log("logout ", res);
    localStorage.removeItem("token");
    setUser(false);
    setToken(false);
    callback();
  };
  // console.log("Mutation ", mutation);
  /**
   * user - returns the status of login
   * signin - function() for signin with callback passed
   * signout - function() for signout with callback passed
   */
  return {
    user,
    token,
    signin,
    signout,
    fetchUser,
    isError: mutation.isError,
    error: mutation.error,
  };
}

export default function AuthProvider(props) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
}
