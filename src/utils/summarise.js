export function summarise(array) {
  let numbers = array.map((item) => parseFloat(item.amount));
  let sum = numbers.reduce((a, b) => a + b, 0);
  return sum.toFixed(2);
}
