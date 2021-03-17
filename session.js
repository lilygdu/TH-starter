import { parseJSON, differenceInMinutes } from "date-fns";
import db from "./db.js";

export const createOrUpdateSession = async ({
  sessionID,
  loggedInUserID,
  clientIp,
  userTrackingID,
}) => {
  let result = await db.query(
    `SELECT created_at, last_known_activity_at, id FROM sessions WHERE id = $1;`,
    [sessionID]
  );
  const session = result.rows[0];
  const now = new Date();
  if (
    // no session with that id
    !session ||
    // the session is older than 15 minutes
    differenceInMinutes(now, parseJSON(session.last_known_activity_at)) > 15
  ) {
    if (userTrackingID) {
      result = await db.query(
        `INSERT INTO sessions (logged_in_user_id, ip_address, user_tracking_id) 
      VALUES ($1, $2, $3) RETURNING id, user_tracking_id;`,
        [loggedInUserID, clientIp, userTrackingID]
      );
    } else {
      result = await db.query(
        `INSERT INTO sessions (logged_in_user_id, ip_address) 
        VALUES ($1, $2) RETURNING id, user_tracking_id;`,
        [loggedInUserID, clientIp]
      );
    }
  } else {
    result = await db.query(
      `UPDATE sessions SET last_known_activity_at = CURRENT_TIMESTAMP
      WHERE id = $1 RETURNING id, user_tracking_id;`,
      [sessionID]
    );
  }
  return result.rows[0];
};
