export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const checkDayCount = (day) => (day >= 0 && day < 10 ? "0" : "");

  const checkMonthCount = (month) => (month >= 0 && month < 9 ? "0" : "");

  const date =
    year +
    "-" +
    checkMonthCount(month) +
    (month + 1) +
    "-" +
    checkDayCount(day) +
    day;

  return date;
}
