import styled from 'styled-components';
import PieCategoryChart from '../atoms/PieCategoryChart';
import BarChart from '../atoms/BarChart';
import SelectInput from '../atoms/Select';
import { ExpenseData } from '../../types/types';
import StatsDataTable from '../molecules/StatsDataTable';

interface Props {
  selectChart: (a: any) => void;
  selectedChart: string;
  expense: ExpenseData[];
  saveExpense: (a: ExpenseData, b: ExpenseData) => void;
  removeExpense: (a: ExpenseData) => void;
  currency: string;
  colors: string[];
  expenseCategories: string[];
}

const Stats = ({
  selectChart,
  selectedChart,
  expense,
  removeExpense,
  saveExpense,
  currency,
  colors,
  expenseCategories,
}: Props) => {
  return (
    <Wrapper>
      <Container>
        <SelectContainer>
          <Select onInput={selectChart}>
            <option value="a">Bar Chart</option>
            <option value="b">Pie Chart</option>
          </Select>
        </SelectContainer>
        <DataContainer>
          <StatsDataTable
            expense={expense}
            currency={currency}
            expenseCategories={expenseCategories}
            saveExpense={saveExpense}
            removeExpense={removeExpense}
          />
        </DataContainer>
        {selectedChart === 'a' ? (
          <BarChart expense={expense} colors={colors} />
        ) : selectedChart === 'b' ? (
          <PieCategoryChart expense={expense} colors={colors} />
        ) : null}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 15px auto;
  border-radius: 5px;
  padding: 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 65vh;
  padding: 10px;
  margin: 10px auto;
  text-align: center;
  border-radius: 5px;
  background-color: #b5e1e6;
  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

const DataContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
`;

const Select = styled(SelectInput)`
  width: 90%;
`;

export default Stats;
