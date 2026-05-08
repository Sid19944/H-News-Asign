import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../apiHandler/axios.api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data) => {
    setIsLoading(true);
    authApi
      .post("/register", data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signIn = async (data) => {
    setIsLoading(true);
    authApi
      .post("/login", data)
      .then((res) => {
        toast.success(res.data.message);
        getCurrUser()
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOut = async () => {
    setIsLoading(true);
    authApi
      .post("/logout")
      .then((res) => {
        toast.success(res.data.message);
        setUser(null);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCurrUser = async () => {
    setIsLoading(true);
    authApi
      .get("/get-user")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error(err.response.data.message || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, logOut, getCurrUser, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
