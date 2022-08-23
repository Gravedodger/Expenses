import React from 'react';
import styled from 'styled-components';
import Table from '../atoms/Table';
import ExpenseRow from './ExpenseRow';
import IncomeRow from './IncomeRow';
import Pagination from '../atoms/Pagination';
import { ExpenseData, IncomeData } from '../../types/types';
import Selection from '../atoms/Select';
import SingleDataItem from './SingleDataItem';

interface Props {
  currentPageIncome: number;
  paginateExpense: (a: number) => void;
  paginateIncome: (a: number) => void;
  postsPerPage: number;
  currentPage: number;
  income: IncomeData[];
  expense: ExpenseData[];
  saveExpense: (a: ExpenseData, b: ExpenseData) => void;
  saveIncome: (a: IncomeData, b: IncomeData) => void;
  removeIncome: (a: IncomeData) => void;
  removeExpense: (a: ExpenseData) => void;
  isExpenseOrIncomeTable: boolean;
  onSelectExpenseIncomeTable: (e: any) => void;
  currency: string;
  expenseCategories: string[];
  incomeSource: string[];
}

const DataTable = ({
  currentPageIncome,
  paginateExpense,
  paginateIncome,
  postsPerPage,
  currentPage,
  income,
  expense,
  saveExpense,
  saveIncome,
  removeIncome,
  removeExpense,
  isExpenseOrIncomeTable,
  onSelectExpenseIncomeTable,
  currency,
  expenseCategories,
  incomeSource,
}: Props) => {
  // Expense Pagination

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const expenseCopy = [...expense];
  const currentPosts = expenseCopy.slice(indexOfFirstPost, indexOfLastPost);

  // Income Pagination

  const indexOfLastPostIncome = currentPageIncome * postsPerPage;
  const indexOfFirstPostIncome = indexOfLastPostIncome - postsPerPage;
  const incomeCopy = [...income];
  const currentPostsIncome = incomeCopy.slice(
    indexOfFirstPostIncome,
    indexOfLastPostIncome,
  );

  return (
    <Flex>
      <Div>
        <h2 style={{ alignSelf: 'center', marginBottom: '50px' }}>
          {isExpenseOrIncomeTable ? 'Spendings' : 'Earnings'}
        </h2>
        <Select onChange={onSelectExpenseIncomeTable}>
          <option value="true">Expense</option>
          <option value="false">Income</option>
        </Select>
        {isExpenseOrIncomeTable
          ? currentPosts.map((item) => (
              <SingleDataItem
                key={item._id}
                sourceArr={expenseCategories}
                item={item}
                remove={removeExpense}
                save={saveExpense}
                currency={currency}
              />
            ))
          : currentPostsIncome.map((item) => (
              <SingleDataItem
                key={item._id}
                sourceArr={incomeSource}
                item={item}
                remove={removeIncome}
                save={saveIncome}
                currency={currency}
              />
            ))}
        <PaginationContainer>
          {isExpenseOrIncomeTable ? (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={expense.length}
              onPaginate={paginateExpense}
            />
          ) : (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={income.length}
              onPaginate={paginateIncome}
            />
          )}
        </PaginationContainer>
      </Div>
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 100%;
  margin: 15px auto;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;

const Div = styled.div.attrs(() => ({}))`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #e0fcd3;
  position: relative;
`;

const Select = styled(Selection)`
  position: absolute;
  top: 0px;
  right: 0px;
  width: auto;
`;

const PaginationContainer = styled.div`
  margin-top: 10px;
  align-self: flex-end;
`;

export default DataTable;
