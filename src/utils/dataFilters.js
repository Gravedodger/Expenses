import { filterDataByThisMonth } from './filterDataByThisMonth';
import { filterDataByLastMonth } from './filterDataByLastMonth';
import { filterDataByThisYear } from './filterDataByThisYear';

const filterByCustomDate = (data, options) => {
  return data.filter(
    (item) =>
      new Date(item.date) >= new Date(options.startDate) &&
      new Date(item.date) <= new Date(options.finishDate),
  );
};

function dataFilter(array, theCase, options) {
  if (options.startDate.length !== 0 && options.finishDate.length !== 0) {
    switch (theCase) {
      case 'CUSTOM_DATE': {
        return filterByCustomDate(array, options);
      }
      default:
        break;
    }
  }
  switch (theCase) {
    case 'THIS_MONTH': {
      return filterDataByThisMonth(array);
    }
    case 'LAST_MONTH': {
      return filterDataByLastMonth(array);
    }
    case 'THIS_YEAR': {
      return filterDataByThisYear(array);
    }
    default:
      break;
  }
}

export { dataFilter };
