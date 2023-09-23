import { createContext, useState } from "react";

import { getAccessTokenFromLS, getProfileFromLS } from "./utils/auth";

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
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
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
