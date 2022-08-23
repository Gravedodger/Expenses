import { summarise } from "./summarise";

export function calculateProfit(income, expense) {
  let a = summarise(income);
  let b = summarise(expense);
  let c = a - b;
  return c.toFixed(2);
}
