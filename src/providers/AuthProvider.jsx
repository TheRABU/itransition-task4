import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authInformation = {};

  return (
    <AuthContext.Provider value={authInformation}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
