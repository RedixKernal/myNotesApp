import { createContext, useState } from 'react';

export const OAuth = createContext();

const AuthProvider = ({ children }) => {
  const [isLogedIn, setisLogedIn] = useState();
  const [deleteUserData, setDeleteUserData] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState(0);
  const [userDetails, setUserDetails] = useState(null);

  const handleSigninUser = (res) => {
    setisLogedIn('SignedIn');
  };
  const handleSignoutUser = (res) => {
    setisLogedIn('SignedOut');
  };

  return (
    <OAuth.Provider
      value={{
        handleSignoutUser,
        handleSigninUser,
        setisLogedIn,
        setUserDetails,
        setActiveBottomTab,
        isLogedIn,
        activeBottomTab,
        userDetails,
        deleteUserData,
        setDeleteUserData,
      }}
    >
      {children}
    </OAuth.Provider>
  );
};
export default AuthProvider;
