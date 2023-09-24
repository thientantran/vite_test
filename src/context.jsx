import { createContext, useState } from "react";

import { getAccessTokenFromLS, getProfileFromLS } from "./utils/auth";

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
};

export const AppContext = createContext(initialAppContext);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAppContext.isAuthenticated,
  );
  const [extendedPurchases, setExtendedPurchases] = useState(
    initialAppContext.extendedPurchases,
  );
  const [profile, setProfile] = useState(initialAppContext.profile);
  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchases([]);
    setProfile(null);
  };
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
