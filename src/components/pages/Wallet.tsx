import DataInput from '../molecules/DataInput';
import DataTable from '../molecules/DataTable';
import { ExpenseData, IncomeData, CommonData } from '../../types/types';

interface Props {
  filter: string;
  expense: ExpenseData[];
  income: IncomeData[];
  common: CommonData;
  addExpense: (a: ExpenseData) => void;
  addIncome: (a: IncomeData) => void;
  selectChart: (a: any) => void;
  paginateExpense: (a: number) => void;
  paginateIncome: (a: number) => void;
  saveExpense: (a: ExpenseData, b: ExpenseData) => void;
  saveIncome: (a: IncomeData, b: IncomeData) => void;
  removeIncome: (a: IncomeData) => void;
  removeExpense: (a: ExpenseData) => void;
  onSelectExpenseIncomeTable: (e: any) => void;
  whichForm: string;
  changeForm: (a: string) => void;
  currency: string;
  expenseCategories: string[];
  incomeSource: string[];
  addBudget: (a: any) => void;
  budget: any;
}

const Wallet = ({
  filter,
  expense,
  income,
  common,
  addExpense,
  addIncome,
  selectChart,
  paginateExpense,
  paginateIncome,
  saveExpense,
  saveIncome,
  removeIncome,
  removeExpense,
  onSelectExpenseIncomeTable,
  whichForm,
  changeForm,
  currency,
  expenseCategories,
  incomeSource,
  addBudget,
  budget,
}: Props) => {
  // console.log('We now have income', income);
  return (
    <>
      <DataInput
        filter={filter}
        addBudget={addBudget}
        budget={budget}
        addExpense={addExpense}
        addIncome={addIncome}
        selectChart={selectChart}
        expense={expense}
        selectedChart={common.selectedChart}
        whichForm={whichForm}
        changeForm={changeForm}
        expenseCategories={expenseCategories}
        incomeSource={incomeSource}
      />
      <DataTable
        currency={currency}
        currentPageIncome={common.currentPageIncome}
        postsPerPage={common.postsPerPage}
        currentPage={common.currentPage}
        paginateExpense={paginateExpense}
        paginateIncome={paginateIncome}
        saveExpense={saveExpense}
        saveIncome={saveIncome}
        removeIncome={removeIncome}
        removeExpense={removeExpense}
        onSelectExpenseIncomeTable={onSelectExpenseIncomeTable}
        expense={expense}
        income={income}
        isExpenseOrIncomeTable={common.isExpenseOrIncomeTable}
        expenseCategories={expenseCategories}
        incomeSource={incomeSource}
      />
    </>
  );
};

export default Wallet;
