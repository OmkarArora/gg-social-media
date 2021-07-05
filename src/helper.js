import axios from "axios";

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function getRelativeTime(current, previous) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let elapsed = current - previous;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "m";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    if (elapsed / msPerDay <= 6) return Math.round(elapsed / msPerDay) + "d";
    else
      return `${new Date(previous).getDate()} ${
        monthNames[new Date(previous).getMonth()]
      }`;
  }
  return `${new Date(previous).getDate()} ${
    monthNames[new Date(previous).getMonth()]
  }`;
}

export function debounce(func, timeout = 500) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, timeout);
  };
}

function fallbackCopyTextToClipboard(text) {
  let textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    if (successful) return "success";
    return "error";
  } catch (err) {
    return "error";
  } finally {
    document.body.removeChild(textArea);
  }
}
export async function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    let message = fallbackCopyTextToClipboard(text);
    return message;
  }
  try {
    await navigator.clipboard.writeText(text);
    return "success";
  } catch (error) {
    return "error";
  }
}
