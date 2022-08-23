export const filterDataByLastMonth = (data) => {
  const currentMonth = new Date().getMonth() - 1;
  return data.filter((item) => currentMonth === new Date(item.date).getMonth());
};
