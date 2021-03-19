import React from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { createPageVisit, createClickEvent } from "../utils/tracking";

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
    const { response, data } = await createPageVisit({
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

  const trackClick = async (event) => {
    const { offsetWidth, offsetHeight } = document.body;
    const { pageX, pageY } = event;
    const percentX = Math.round((100 * pageX) / offsetWidth);
    const percentY = Math.round((100 * pageY) / offsetHeight);
    const {
      trackingId: trackingID,
      trackingAction,
      trackingName,
      trackingType,
      trackingElement,
    } = event.currentTarget.dataset;
    const { response, data } = await createClickEvent({
      pageName: location.pathname,
      sessionID,
      userID,
      userTrackingID,
      percentX,
      percentY,
      trackingID,
      trackingAction,
      trackingElement,
      trackingType,
      trackingName,
      pageVisitID,
    });
    if (response.ok) {
      setSessionID(data.session.id);
      setUserTrackingID(data.session.user_tracking_id);
      setPageVisitID(data.pageVisitID);
    }
  };

  return (
    <TrackingContext.Provider value={{ trackClick, sessionID, userTrackingID }}>
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingContextProvider;
