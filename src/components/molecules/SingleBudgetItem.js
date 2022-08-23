import { useState } from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function filterOutAndSum(budgetItem, expenseArr) {
  const filteredArr = expenseArr.filter(
    (item) => item.category === budgetItem.category,
  );
  const sum = filteredArr.reduce(
    (total, curr) => total + Number(curr.amount),
    0,
  );
  return sum;
}

//   NEED TO BRING CURRENCY HERE
// CHECK IF THE FILTERING AND SUMMARIZING FUNCTION CAN BE IMPROVED BY MOVING IT UP A TREE

const SingleBudgetItem = ({ budgetItem, expense }) => {
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const { category, budget } = budgetItem;
  const spent = filterOutAndSum(budgetItem, expense);
  const percentage = ((spent * 100) / budget).toFixed();

  function handleShowTooltip(cond) {
    setIsShowTooltip(cond);
  }

  return (
    <Wrapper>
      <p>{category}</p>
      <p>#{Number(budget).toFixed(2)}</p>
      <Container
        onMouseEnter={() => {
          handleShowTooltip(true);
        }}
        onMouseLeave={() => {
          handleShowTooltip(false);
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: 'black',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
            pathColor: `rgb(255, 0, 0, ${percentage / 100})`,
          })}
        />
        <Tooltip isShowTooltip={isShowTooltip}>
          <p style={{ color: 'white' }}>Spent: #{Number(spent).toFixed(2)}</p>
          <p style={{ color: 'white' }}>
            Left: #{(Number(budget) - Number(spent)).toFixed(2)}
          </p>
        </Tooltip>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #e0fcd3;
  padding: 10px;
  width: 75%;
  border-radius: 5px;
  margin: 5px 0px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

const Tooltip = styled.div`
  display: ${(props) => (props.isShowTooltip ? 'block' : 'none')};
  background-color: black;
  position: absolute;
  border-radius: 10px;
  width: 150px;
  bottom: 90%;
  right: 80%;
  padding: 5px;
`;

export default SingleBudgetItem;
