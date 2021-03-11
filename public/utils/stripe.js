export const fetchSession = async (sessionID) => {
  const response = await fetch(`/sessions/${sessionID}`);
  const data = await response.json();
  return { data, response };
};
