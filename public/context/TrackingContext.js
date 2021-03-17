import React from "react";
import { UserContext } from "./UserContext";

export const TrackingContext = React.createContext({});

const TrackingContextProvider = ({ children }) => {
  const { userID } = React.useContext(UserContext);
  const [sessionID, setSessionID] = React.useState(
    localStorage.getItem("sessionID")
  );
  const [userTrackingID, setUserTrackingID] = React.useState(
    localStorage.getItem("userTrackingID")
  );

  console.log({ sessionID, userID, userTrackingID });

  React.useEffect(async () => {
    const response = await fetch("/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loggedInUserID: userID,
        sessionID,
        userTrackingID,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setSessionID(data.session.id);
      setUserTrackingID(data.session.user_tracking_id);
    }
  }, []);

  React.useEffect(() => {
    if (sessionID) {
      localStorage.setItem("sessionID", sessionID);
    } else {
      localStorage.removeItem("sessionID");
    }
  }, [sessionID]);

  React.useEffect(() => {
    if (userTrackingID) {
      localStorage.setItem("userTrackingID", userTrackingID);
    } else {
      localStorage.removeItem("userTrackingID");
    }
  }, [userTrackingID]);

  return (
    <TrackingContext.Provider value={{}}>{children}</TrackingContext.Provider>
  );
};

export default TrackingContextProvider;
