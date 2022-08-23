import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { createAndSumEachCategory } from '../../utils/commonFunctions';
import { sortByAmount } from '../../utils/sortByAmount';

ChartJS.register(ArcElement, Tooltip, Legend);

const dataToRender = (expense) => {
  const eachCategorySummedUp = createAndSumEachCategory(expense);
  const data = [];

  for (let x in eachCategorySummedUp) {
    if (parseFloat(eachCategorySummedUp[x]) !== 0) {
      data.push({ name: x, value: parseFloat(eachCategorySummedUp[x]) });
    }
  }
  return data;
};

const PieCategoryChart = ({ expense, colors }) => {
  const data = {
    labels: sortByAmount(dataToRender(expense)).map(
      (item, idx) => idx + 1 + '. ' + item.name.toUpperCase(),
    ),
    datasets: [
      {
        label: 'EXPENSE',
        data: sortByAmount(dataToRender(expense)).map((item) => item.value),
        backgroundColor: colors.map((color) => color),
        //   borderColor: [
        //     "rgba(255, 99, 132, 1)",
        //     "rgba(54, 162, 235, 1)",
        //     "rgba(255, 206, 86, 1)",
        //     "rgba(75, 192, 192, 1)",
        //     "rgba(153, 102, 255, 1)",
        //     "rgba(255, 159, 64, 1)",
        //   ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <PieContainer>
      <Pie style={{ width: '100%', height: '100%' }} data={data} />
    </PieContainer>
  );
};

export default PieCategoryChart;

const PieContainer = styled.div`
  padding-top: 25px;
  width: 50%;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
