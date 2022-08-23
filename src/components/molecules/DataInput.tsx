import { useState } from 'react';
import styled from 'styled-components';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import { ExpenseData, IncomeData } from '../../types/types';
import BudgetSetter from './BudgetSetter';

interface Props {
  addExpense: (a: ExpenseData) => void;
  addIncome: (a: IncomeData) => void;
  expense: ExpenseData[];
  selectChart: (a: any) => void;
  selectedChart: string;
  whichForm: string;
  changeForm: (a: string) => void;
  expenseCategories: string[];
  incomeSource: string[];
  addBudget: (a: any) => void;
  budget: any;
  filter: string;
}

const DataInput = ({
  filter,
  addExpense,
  addIncome,
  expenseCategories,
  whichForm,
  changeForm,
  incomeSource,
  addBudget,
  budget,
  expense,
}: Props) => {
  const [isExpenseTab, setIsExpenseTab] = useState<boolean>(true);
  const [isIncomeTab, setIsIncomeTab] = useState<boolean>(false);

  const changeTab = (tabName: string) => {
    changeForm(tabName);
    if (tabName === 'expense') {
      setIsExpenseTab(true);
      setIsIncomeTab(false);
    }
    if (tabName === 'income') {
      setIsExpenseTab(false);
      setIsIncomeTab(true);
    }
  };

  return (
    <Wrapper>
      <MainInputContainer>
        <DataInputTabContainer>
          <DataInputTabItem
            isExpenseTab={isExpenseTab}
            onClick={() => changeTab('expense')}
          >
            Expense
          </DataInputTabItem>
          <DataInputTabItem
            isIncomeTab={isIncomeTab}
            onClick={() => changeTab('income')}
          >
            Income
          </DataInputTabItem>
        </DataInputTabContainer>
        <Container>
          {whichForm === 'expense' && (
            <>
              <h2>Expense</h2>
              <ExpenseForm
                addExpense={addExpense}
                expenseCategories={expenseCategories}
              />
            </>
          )}
          {whichForm === 'income' && (
            <>
              <h2>Income</h2>
              <IncomeForm addIncome={addIncome} incomeSource={incomeSource} />
            </>
          )}
        </Container>
      </MainInputContainer>
      <MainBudgetContainer>
        <BudgetSetter
          filter={filter}
          expenseCategories={expenseCategories}
          addBudget={addBudget}
          budget={budget}
          expense={expense}
        />
      </MainBudgetContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  gap: 20px;
  display: flex;
  width: 100%;
  margin: 15px auto;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    flex-flow: column;
    width: 95%;
    padding: 15px;
  }
`;

const MainInputContainer = styled.div`
  width: 25%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MainBudgetContainer = styled.div`
  position: relative;
  width: 75%;
  text-align: center;
  background-color: #b5e1e6;
  overflow-y: scroll;
  height: 350px;
  border-radius: 5px;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DataInputTabContainer = styled.div`
  display: flex;
  flex-flow: row;
`;
const DataInputTabItem = styled.div`
  padding: 5px 5px 0px 5px;
  background: ${(props: { isExpenseTab?: boolean; isIncomeTab?: boolean }) =>
    props.isExpenseTab
      ? 'rgb(181, 225, 230)'
      : props.isIncomeTab
      ? 'rgb(181, 225, 230)'
      : 'rgb(255, 255, 255)'};
  border-radius: ${(props: { isExpenseTab?: boolean; isIncomeTab?: boolean }) =>
    props.isExpenseTab
      ? '5px 5px 0px 0px'
      : props.isIncomeTab
      ? '5px 5px 0px 0px'
      : '0px'};
  cursor: pointer;
  padding: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  text-align: center;
  border-radius: 0px 5px 5px 5px;
  background-color: #b5e1e6;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column;
  }
`;

export default DataInput;
