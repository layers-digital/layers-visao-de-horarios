export default function getCurrentWeekday(weekdays) {
  let today = new Date();
  let weekday = new Array(7);
  weekday[0] = "sunday";
  weekday[1] = "monday";
  weekday[2] = "tuesday";
  weekday[3] = "wednesday";
  weekday[4] = "thursday";
  weekday[5] = "friday";
  weekday[6] = "saturday";
  let currentWeekday = weekday[today.getDay()];

  if (weekdays.indexOf("sunday") == -1 && currentWeekday == "sunday") {
    currentWeekday = "monday";
  } else if (
    weekdays.indexOf("saturday") == -1 &&
    currentWeekday == "saturday"
  ) {
    currentWeekday = "monday";
  }
  return currentWeekday;
}
