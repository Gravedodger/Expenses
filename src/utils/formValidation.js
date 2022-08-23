export const validateExpense = (values) => {
  const errors = {};
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.category) {
    errors.category = "Required";
  }
  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount < 0) {
    errors.amount = ">0 only";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  return errors;
};

export const validateIncome = (values) => {
  const errors = {};
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.source) {
    errors.source = "Required";
  }
  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount < 0) {
    errors.amount = ">0 only";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  return errors;
};
