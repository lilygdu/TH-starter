import React from "react";

export const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = React.useState(localStorage.getItem("userID"));
  const [userEmail, setUserEmail] = React.useState(
    localStorage.getItem("email")
  );
  const isLoggedIn = !!userEmail && !!userID;

  React.useEffect(() => {
    localStorage.setItem("email", userEmail);
  }, [userEmail]);

  React.useEffect(() => {
    localStorage.setItem("userID", userID);
  }, [userID]);

  return (
    <UserContext.Provider
      value={{ userID, userEmail, isLoggedIn, setUserEmail, setUserID }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
