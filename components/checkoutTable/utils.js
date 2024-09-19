import React from "react";
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  const dateOnly = date.toLocaleDateString();
  const timeOnly = date.toLocaleTimeString();
  return { dateOnly, timeOnly };
}
