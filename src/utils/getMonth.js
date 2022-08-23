const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonth = (label) => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (label.customDate) {
    if (label.customDate.startDate && label.customDate.finishDate) {
      switch (label.filter) {
        case 'CUSTOM_DATE': {
          return (
            label.customDate.startDate + ' - ' + label.customDate.finishDate
          );
        }
        default:
          break;
      }
    }
  }

  switch (label.filter) {
    case 'THIS_MONTH': {
      return months[month];
    }
    case 'LAST_MONTH': {
      return months[month - 1];
    }
    case 'THIS_YEAR': {
      return year;
    }
    default:
      break;
  }
};
