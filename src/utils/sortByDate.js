export function sortByDate(array) {
  return array.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
