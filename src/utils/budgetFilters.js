import { filterDataByThisMonth } from './filterDataByThisMonth';
import { filterDataByLastMonth } from './filterDataByLastMonth';
import { filterDataByThisYear } from './filterDataByThisYear';

const filterByCustomDate = (data, options) => {
  return data.filter(
    (item) =>
      new Date(item.date).getMonth() >=
        new Date(options.startDate).getMonth() &&
      new Date(item.date).getMonth() <= new Date(options.finishDate).getMonth(),
  );
};

function summariseBudget(arr) {
  const newarr = [];

  for (const item of arr) {
    for (const seconditem of item.items) {
      newarr.push(seconditem);
    }
  }

  const shapedArr = newarr.reduce((res, cur) => {
    if (res[cur.category]) {
      res[cur.category] = Number(res[cur.category]) + Number(cur.budget);
    } else {
      res[cur.category] = Number(cur.budget);
    }
    return res;
  }, {});

  const finaldata = Object.entries(shapedArr).map((item) => ({
    category: item[0],
    budget: item[1],
  }));

  return [{ items: finaldata }];
}

function filterOutBudget(array, filterCase, customFilter) {
  if (
    customFilter.startDate.length !== 0 &&
    customFilter.finishDate.length !== 0
  ) {
    switch (filterCase) {
      case 'CUSTOM_DATE': {
        return summariseBudget(filterByCustomDate(array, customFilter));
      }
      default:
        break;
    }
  }
  switch (filterCase) {
    case 'THIS_MONTH': {
      return filterDataByThisMonth(array);
    }
    case 'LAST_MONTH': {
      return filterDataByLastMonth(array);
    }
    case 'THIS_YEAR': {
      return summariseBudget(filterDataByThisYear(array));
    }
    default:
      break;
  }
}

function budgetFilter(budget, filter, customDateData) {
  if (budget.length <= 0) {
    return [];
  }
  const filteredData = filterOutBudget(budget, filter, customDateData);
  if (!filteredData.length) {
    return [];
  }
  return filteredData[0].items;
}

export { budgetFilter };
