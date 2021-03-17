import React from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { createSession } from "../utils/tracking";

export const TrackingContext = React.createContext({});

const TrackingContextProvider = ({ children }) => {
  const location = useLocation();
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

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const stripePurchaseID = query.get("session_id");
    const isCartAbandoned = stripePurchaseID
      ? false
      : query.get("cart_abandoned") === "true"
      ? true
      : null;
    fetch("/page_view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionID,
        pageName: location.pathname,
        stripePurchaseID,
        isCartAbandoned,
      }),
    });
  }, [location]);

  return (
    <TrackingContext.Provider value={{}}>{children}</TrackingContext.Provider>
  );
};

export default TrackingContextProvider;
