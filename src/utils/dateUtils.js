export const isRecentlyAdded = (creationTime, thresholdDays = 7) => {
  if (!creationTime) return false;
  const creationDate = new Date(creationTime);
  const currentDate = new Date();
  const timeDifference = (currentDate - creationDate) / (1000 * 60 * 60 * 24);
  return timeDifference <= thresholdDays;
};

export const formatNullValue = (value) =>
  value === "NULL" || value === null ? "____" : value; //Since data from excel so it comes as string

export const getTime = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
};
