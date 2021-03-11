import React from "react";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = React.useState(localStorage.getItem("userID"));
  const [userEmail, setUserEmail] = React.useState(
    localStorage.getItem("email")
  );
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName")
  );

  const history = useHistory();
  const isLoggedIn = !!userEmail && !!userID;

  React.useEffect(() => {
    if (userEmail) {
      localStorage.setItem("email", userEmail);
    } else {
      localStorage.removeItem("email");
    }
  }, [userEmail]);

  React.useEffect(() => {
    if (userID) {
      localStorage.setItem("userID", userID);
    } else {
      localStorage.removeItem("userID");
    }
  }, [userID]);

  React.useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]);

  const redirectIfNotLoggedIn = () => {
    if (!isLoggedIn) {
      history.push("/signin");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userID,
        userEmail,
        userName,
        isLoggedIn,
        setUserEmail,
        setUserID,
        setUserName,
        redirectIfNotLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
