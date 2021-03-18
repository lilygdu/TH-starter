import React from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { createSession, createPageView } from "../utils/tracking";

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
  const [pageVisitID, setPageVisitID] = React.useState(null);

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

  React.useEffect(async () => {
    const query = new URLSearchParams(window.location.search);
    const stripePurchaseID = query.get("session_id");
    const isCartAbandoned = stripePurchaseID
      ? false
      : query.get("cart_abandoned") === "true"
      ? true
      : null;
    const { response, data } = await createPageView({
      sessionID,
      pageName: location.pathname,
      isCartAbandoned,
      userID,
      userTrackingID,
      stripePurchaseID,
    });
    if (response.ok) {
      setSessionID(data.session.id);
      setUserTrackingID(data.session.user_tracking_id);
      setPageVisitID(data.pageVisitID);
    }
  }, [location]);

  const trackClick = (event) => {
    const { offsetWidth, offsetHeight } = document.body;
    const { pageX, pageY } = event;
    const percentX = Math.round((100 * pageX) / offsetWidth);
    const percentY = Math.round((100 * pageY) / offsetHeight);
    const {
      trackingId,
      trackingAction,
      trackingName,
      trackingType,
      trackingElement,
    } = event.currentTarget.dataset;
    console.log({
      percentX,
      percentY,
      trackingId,
      trackingAction,
      trackingElement,
      trackingType,
      trackingName,
      pageVisitID,
    });
  };

  return (
    <TrackingContext.Provider value={{ trackClick }}>
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingContextProvider;
