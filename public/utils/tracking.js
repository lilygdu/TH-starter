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
