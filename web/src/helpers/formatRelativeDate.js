export default function formatRelativeDate(date) {
  if (!date) return "";

  let diff = new Date() - date; // the difference in milliseconds
  let sec = Math.floor(diff / 1000); // convert diff to seconds

  if (sec < 60) {
    return "agora mesmo";
  }

  let min = Math.floor(diff / 60000); // convert diff to minutes
  if (min < 60) {
    return "há " + min + " min";
  }

  let day = Math.floor(diff / 144000000); // convert diff to days
  if (day < 1) {
    return "há algumas horas";
  } else if (day == 1) {
    return "há " + day + " dia";
  } else if (day < 350) {
    return "há " + day + " dias";
  }

  // format the date
  // add leading zeroes to single-digit day/month/hours/minutes
  let d = date;

  // trying to transform string in date
  if (!(typeof d.getMonth === "function")) {
    d = new Date(d);
  }

  if (!(typeof d.getMonth === "function")) {
    return "";
  }
  d = [
    "0" + d.getDate(),
    "0" + (d.getMonth() + 1),
    "" + d.getFullYear(),
    "0" + d.getHours(),
    "0" + d.getMinutes(),
  ].map((component) => component.slice(-2)); // take last 2 digits of every component

  // join the components into date
  return d.slice(0, 3).join("/") + " " + d.slice(3).join(":");
}
