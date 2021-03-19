export const createPageVisit = async ({
  sessionID,
  pageName,
  stripePurchaseID,
  isCartAbandoned,
  userTrackingID,
  userID,
}) => {
  const response = await fetch("/page_visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionID,
      pageName,
      stripePurchaseID,
      isCartAbandoned,
      userTrackingID,
      loggedInUserID: userID,
    }),
  });
  const data = await response.json();
  return { response, data };
};

export const createClickEvent = async ({
  pageName,
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
}) => {
  const response = await fetch("/click_event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionID,
      pageName,
      loggedInUserID: userID,
      userTrackingID,
      percentX,
      percentY,
      trackingID,
      trackingAction,
      trackingElement,
      trackingType,
      trackingName,
      pageVisitID,
    }),
  });
  const data = await response.json();
  return { response, data };
};
