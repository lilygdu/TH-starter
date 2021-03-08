import React from "react";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext({});

const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = React.useState(localStorage.getItem("userID"));
  const [userEmail, setUserEmail] = React.useState(
    localStorage.getItem("email")
  );
  const history = useHistory();
  const isLoggedIn = !!userEmail && !!userID;
  // console.log({ isLoggedIn });
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
        isLoggedIn,
        setUserEmail,
        setUserID,
        redirectIfNotLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
