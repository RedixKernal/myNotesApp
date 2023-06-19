import react, { createContext, useState } from 'react';
export const OAuth = createContext();

const AuthProvider = ({ children }) => {
  const [isLogedIn, setisLogedIn] = useState();
  const [activeBottomTab, setActiveBottomTab] = useState(0);
  const [userDetails, setUserDetails] = useState(null);

  const handleSigninUser = (res) => {
    setisLogedIn('SignedIn');
    console.log(res?.message);
  };
  const handleSignoutUser = (res) => {
    setisLogedIn('SignedOut');
    console.log(res?.message);
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
      }}
    >
      {children}
    </OAuth.Provider>
  );
};
export default AuthProvider;
