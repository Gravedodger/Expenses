export const filterDataByThisYear = (data) => {
  const currentYear = new Date().getFullYear();
  return data.filter(
    (item) => currentYear === new Date(item.date).getFullYear()
  );
};
