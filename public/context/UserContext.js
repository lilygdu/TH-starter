import React from "react";

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = React.useState(localStorage.getItem("userID"));
  const [userEmail, setUserEmail] = React.useState(
    localStorage.getItem("email")
  );
  const isLoggedIn = !!email && !!userID;

  React.useEffect(() => {
    localStorage.setItem("email", userEmail);
  }, [userEmail]);

  return (
    <UserContext.Provider
      value={{ userID, userEmail, isLoggedIn, setUserEmail, setUserID }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
