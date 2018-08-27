export function capitalize(str = "") {
  return typeof str !== "string"
    ? ""
    : str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export const humanReadableTime = (timestamp = "") =>
  isNaN(timestamp) ? "" : new Date(timestamp).toString();
