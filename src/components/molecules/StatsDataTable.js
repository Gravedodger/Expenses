import { useState } from 'react';
import styled from 'styled-components';
import { sortByAmount } from '../../utils/sortByAmount';
import { createAndSumEachCategory } from '../../utils/commonFunctions';
import SingleDataItem from './SingleDataItem';

const filterByCategory = (filter, expense) => {
  return expense.filter(
    (item) => item.category.toLowerCase() === filter.toLowerCase(),
  );
};

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

const StatsDataTable = ({
  expense,
  currency,
  expenseCategories,
  saveExpense,
  removeExpense,
}) => {
  const [filter, setFilter] = useState('');

  return (
    <ContainerWrapper>
      <Div1>
        {sortByAmount(dataToRender(expense)).map((item, idx) => (
          <Div
            key={item.name}
            onClick={() => setFilter(item.name)}
            style={{ cursor: 'pointer' }}
          >
            <p>
              <b>
                {idx + 1}. {item.name.toUpperCase()}:
              </b>{' '}
              <span style={{ color: 'red', fontWeight: 'bold' }}>
                {currency} {item.value.toFixed(2)}
              </span>
            </p>
          </Div>
        ))}
      </Div1>
      <Div2>
        {filter &&
          filterByCategory(filter, expense).map((item) => (
            <div key={item._id}>
              <SingleDataItem
                item={item}
                remove={removeExpense}
                save={saveExpense}
                currency={currency}
                sourceArr={expenseCategories}
              />
            </div>
          ))}
      </Div2>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 25px;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Div = styled.div``;

const Div1 = styled.div`
  width: 100%;
  height: 50%;
  padding: 5px;
`;

const Div2 = styled.div`
  width: 100%;
  height: 50%;
  padding: 5px;
`;

export default StatsDataTable;
