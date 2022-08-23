import styled from 'styled-components';
import Header from '../atoms/Header';
import SelectEl from '../atoms/Select';
import CustomDatePicker from '../molecules/CustomDatePicker';
import { calculateProfit } from '../../utils/calculateProfit';
import { summarise } from '../../utils/summarise';
import { ExpenseData, IncomeData } from '../../types/types';
import { getMonth } from '../../utils/getMonth';

interface Props {
  expense: ExpenseData[];
  income: IncomeData[];
  changeFilter: (e: any) => void;
  submitCustomDate: (a: any) => void;
  isCustomDate: boolean;
  currency: string;
  label: {
    filter: string;
    customDate: { startDate: string; finishDate: string };
  };
}

const HeaderData = ({
  expense,
  income,
  changeFilter,
  submitCustomDate,
  isCustomDate,
  currency,
  label,
}: Props) => {
  return (
    <Container>
      <FlexColumn>
        <FlexRow style={{ position: 'relative' }}>
          <h2>{getMonth(label)}</h2>
          <div
            style={{
              position: 'absolute',
              right: '0px',
              width: '200px',
              textAlign: 'right',
            }}
          >
            <Select style={{ width: 'auto' }} onChange={changeFilter}>
              <option value="THIS_MONTH">This Month</option>
              <option value="LAST_MONTH">Last Month</option>
              <option value="THIS_YEAR">This Year</option>
              <option value="CUSTOM_DATE">Custom Date</option>
            </Select>
          </div>
        </FlexRow>
        <FlexRow>
          {isCustomDate && (
            <CustomDatePicker submitCustomDate={submitCustomDate} />
          )}
        </FlexRow>
        <FlexRow>
          <Div style={{ backgroundColor: '#68EDCB' }}>
            <Header text="Income" />
            {currency + ' '}
            {summarise(income)}
          </Div>
          <Div style={{ backgroundColor: '#FFAEB9' }}>
            <Header text="Expense" />
            {currency + ' '}
            {summarise(expense)}
          </Div>
          <Div style={{ backgroundColor: '#91C2E3' }}>
            <Header text="Profit" />
            {currency + ' '}
            {calculateProfit(income, expense)}
          </Div>
        </FlexRow>
      </FlexColumn>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 10px auto;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 95%;
    padding: 5px;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-flow: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  width: 33.33%;
  padding: 10px 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 5px;
  background-color: #fecac6;
`;

const Select = styled(SelectEl)`
  border: 1px solid darkgrey;
`;

export default HeaderData;
