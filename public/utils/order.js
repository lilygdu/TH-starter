export const formatOrderNumber = (stripeID) => {
  return stripeID.slice(8, 18);
};
