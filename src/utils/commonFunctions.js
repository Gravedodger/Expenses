import { summarise } from "./summarise";

export function filterOut(filter) {
  return function (array) {
    return array.category === filter;
  };
}

export function createAndSumEachCategory(state) {
  const names = {};
  const category = [...new Set(state.map((item) => item.category))];

  for (let i = 0; i < category.length; i++) {
    names[category[i].toLowerCase()] = summarise(
      state.filter(filterOut(category[i]))
    );
  }
  return names;
}
