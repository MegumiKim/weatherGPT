export function convertTimeString(isoString) {
  const date = new Date(isoString);

  const options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-NO", options);
}
