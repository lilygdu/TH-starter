export const createSession = async ({ userID, sessionID, userTrackingID }) => {
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
  return { response, data };
};

export const createPageView = async ({
  sessionID,
  pageName,
  stripePurchaseID,
  isCartAbandoned,
  userTrackingID,
  userID,
}) => {
  const response = await fetch("/page_view", {
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
