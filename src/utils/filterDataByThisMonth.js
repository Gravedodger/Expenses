export const filterDataByThisMonth = (data) => {
  const currentMonth = new Date().getMonth();
  return data.filter((item) => currentMonth === new Date(item.date).getMonth());
};
