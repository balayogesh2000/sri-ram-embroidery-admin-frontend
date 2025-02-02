"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api, { axiosServerInstance } from "@/lib/api";
import handleError from "@/utils/handleError";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isLoggedIn: false,
  });

  const [loading, setLoading] = useState(true);

  const setAxiosAuthHeader = useCallback((token) => {
    if (token) {
      axiosServerInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axiosServerInstance.defaults.headers.common["Authorization"];
    }
  }, []);

  const loginHandler = useCallback(
    ({ token = null, user = null }) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      setAxiosAuthHeader(token);
      setAuthState({ token, user, isLoggedIn: true });
      setLoading(false);
    },
    [setAxiosAuthHeader]
  );

  const logoutHandler = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setAxiosAuthHeader(null);
    setAuthState({ token: null, user: null, isLoggedIn: false });
    setLoading(false);
  }, [setAxiosAuthHeader]);

  const loginBasedOnToken = useCallback(
    async (token) => {
      try {
        setAxiosAuthHeader(token);
        const {
          data: { user },
        } = await api.users.getMe();
        loginHandler({ token, user });
      } catch (err) {
        handleError(err);
        logoutHandler();
      } finally {
        setLoading(false);
      }
    },
    [setAxiosAuthHeader, loginHandler, logoutHandler]
  );

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      loginBasedOnToken(token);
    } else {
      setLoading(false);
    }
  }, [loginBasedOnToken]);

  const contextValue = useMemo(
    () => ({
      ...authState,
      loading,
      login: loginHandler,
      logout: logoutHandler,
    }),
    [authState, loading, loginHandler, logoutHandler]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
