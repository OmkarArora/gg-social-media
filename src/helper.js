import axios from "axios";

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function getRelativeTime(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  // var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "m";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    if (elapsed / msPerDay <= 6)
      return Math.round(elapsed / msPerDay) + "d";
    else return "" + previous.getDate() + previous.getMonth();
  }
  return "" + previous.getDate() + previous.getMonth();
  // else if (elapsed < msPerYear) {
  //     return Math.round(elapsed/msPerMonth) + ' months ago';
  // }

  // else {
  //     return Math.round(elapsed/msPerYear ) + ' years ago';
  // }
}
