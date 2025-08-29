import React, { createContext, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/configureStore";

type AuthContextType = {
  user: any;
};

export const AuthContext = createContext<AuthContextType>({ user: {} });

const AuthContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
