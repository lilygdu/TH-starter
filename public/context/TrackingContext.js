import React from "react";
import { UserContext } from "./UserContext";
import { createSession } from "../utils/tracking";

export const TrackingContext = React.createContext({});

const TrackingContextProvider = ({ children }) => {
  const { userID } = React.useContext(UserContext);
  const [sessionID, setSessionID] = React.useState(
    localStorage.getItem("sessionID")
  );
  const [userTrackingID, setUserTrackingID] = React.useState(
    localStorage.getItem("userTrackingID")
  );

  React.useEffect(async () => {
    const { response, data } = await createSession({
      userID,
      userTrackingID,
      sessionID,
    });
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
