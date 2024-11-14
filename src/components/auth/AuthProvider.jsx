import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(Cookies.get("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // localStorage.setItem('token',token);
      Cookies.set('token', token)
    } else {
      delete axios.defaults.headers.common["Authorization"];
      // localStorage.removeItem('token')
      Cookies.remove('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;