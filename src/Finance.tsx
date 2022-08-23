// BUTTON STYLING CANNOT BE ADDED WHEN DOING HIGHER ORDER COMPONENT WITH STYLED COMONENTS
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from './components/molecules/NavBar';
import Wallet from './components/pages/Wallet';
import Stats from './components/pages/Stats';
import Profile from './components/pages/Profile';
import HeaderData from './components/molecules/HeaderData';
import { sortByDate } from './utils/sortByDate';
import { ExpenseData, IncomeData } from './types/types';
import { useAuth0 } from '@auth0/auth0-react';
import {
  addExpense as addExpenseApi,
  addIncome as addIncomeApi,
  loadExpenses,
  loadIncome,
  deleteIncome,
  deleteExpense,
  updateIncome,
  updateExpense,
  loadSettings,
  updateSettings,
  createSettings,
} from './api/apiCalls';
import settingsData from './data/settingsData.json';
import { budgetFilter } from './utils/budgetFilters';
import { dataFilter } from './utils/dataFilters';

const Finance = () => {
  const [expense, setExpense] = useState<ExpenseData[]>([]);
  const [income, setIncome] = useState<IncomeData[]>([]);
  const [pageToShow, setPageToShow] = useState<string>('wallet');
  const [whichForm, setWhichForm] = useState<string>('expense');
  const [filter, setFilter] = useState<string>('THIS_MONTH');
  const [isCustomDate, setIsCustomDate] = useState<boolean>(false);
  const [customDateData, setCustomDateData] = useState({
    startDate: '',
    finishDate: '',
  });
  const [common, setCommon] = useState({
    currency: '€',
    isExpenseOrIncomeTable: true,
    selectedChart: 'a',
    currentPage: 1,
    currentPageIncome: 1,
    postsPerPage: 10,
  });
  const [settings, setSettings] = useState<{
    expenseCategory: string[];
    incomeSource: string[];
    currency: string;
    colors: string[];
    budget: {}[];
  }>({
    expenseCategory: [],
    incomeSource: [],
    currency: '',
    colors: [],
    budget: [],
  });

  const [accessToken, setAccessToken] = useState<string>('');

  const { logout, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently({
      audience: 'https://cashbit.application.finance.com',
    }).then((token) => setAccessToken(token));
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (accessToken) {
      loadExpenses(accessToken).then((data) =>
        setExpense(sortByDate(data || [])),
      );
      loadIncome(accessToken).then((data) => setIncome(sortByDate(data || [])));
      loadSettings(accessToken).then((data: any) => {
        if (data.length === 0) {
          createSettings(settingsData, accessToken).then((newsettings: any) => {
            setSettings(newsettings || {});
          });
        } else {
          setSettings(data[0] || {});
        }
      });
    }
  }, [accessToken]);

  function addBudget(budgetObj: any) {
    const budgetItem = settings.budget.find(
      (item: any) =>
        new Date(item?.date).getMonth() === new Date(budgetObj.date).getMonth(),
    );

    if (!budgetItem) {
      setSettings((prev) => ({ ...prev, budget: [...prev.budget, budgetObj] }));
      updateSettings(
        { ...settings, budget: [...settings.budget, budgetObj] },
        accessToken,
      );
      return;
    }

    setSettings((prev: any) => ({
      ...prev,
      budget: prev.budget.map((item: any) => {
        if (
          new Date(item.date).getMonth() === new Date(budgetObj.date).getMonth()
        ) {
          return budgetObj;
        } else {
          return item;
        }
      }),
    }));
    updateSettings(
      {
        ...settings,
        budget: settings.budget.map((item: any) => {
          if (
            new Date(item.date).getMonth() ===
            new Date(budgetObj.date).getMonth()
          ) {
            return budgetObj;
          } else {
            return item;
          }
        }),
      },
      accessToken,
    );
  }

  function addIncome(values: IncomeData) {
    addIncomeApi(values, accessToken).then((data) =>
      setIncome((prev) => sortByDate([...prev, data])),
    );
  }

  function addExpense(values: ExpenseData) {
    addExpenseApi(values, accessToken).then((data) =>
      setExpense((prev) => sortByDate([...prev, data])),
    );
  }

  function removeIncome(item: IncomeData) {
    deleteIncome(item, accessToken);
    setIncome((prev) => prev.filter((x) => x._id !== item._id));
  }

  function removeExpense(item: ExpenseData) {
    deleteExpense(item, accessToken);
    setExpense((prev) => prev.filter((x) => x._id !== item._id));
  }

  function saveIncome(item: IncomeData, changedData: IncomeData) {
    updateIncome(changedData, accessToken);
    const indexOfItem = income.indexOf(item);
    setIncome(() =>
      income.map((x, i) => (i === indexOfItem ? { ...x, ...changedData } : x)),
    );
  }

  function saveExpense(item: ExpenseData, changedData: ExpenseData) {
    console.log(item);
    console.log(changedData);
    updateExpense(changedData, accessToken);
    const indexOfItem = expense.indexOf(item);
    setExpense(() =>
      expense.map((x, i) => (i === indexOfItem ? { ...x, ...changedData } : x)),
    );
  }

  function selectTable(event: any) {
    let value = JSON.parse(event.target.value);
    setCommon({
      ...common,
      isExpenseOrIncomeTable: value,
    });
  }

  function selectChart(event: any) {
    setCommon({
      ...common,
      selectedChart: event.target.value,
    });
  }

  function paginateExpense(number: number) {
    setCommon({
      ...common,
      currentPage: number,
    });
  }

  function paginateIncome(number: number) {
    setCommon({
      ...common,
      currentPageIncome: number,
    });
  }

  function logoutAccount() {
    logout({ returnTo: window.location.origin });
  }

  function changePage(page: string) {
    setPageToShow(page);
  }

  function changeForm(formDetails: string) {
    setWhichForm(formDetails);
  }

  function changeFilter(e: any) {
    if (e.target.value === 'CUSTOM_DATE') {
      setIsCustomDate(true);
      return;
    }
    setFilter(e.target.value);
    setIsCustomDate(false);
    setCustomDateData({ startDate: '', finishDate: '' });
  }

  function submitCustomDate(data: any) {
    setFilter('CUSTOM_DATE');
    setCustomDateData(data);
  }

  function handleChangeCurrency(currencyPicked: string) {
    updateSettings({ ...settings, currency: currencyPicked }, accessToken);
    setSettings((prev) => ({ ...prev, currency: currencyPicked }));
  }

  function handleChangeExpenseCategories(expenseList: any) {
    const colorsList = settings.colors.slice(0, expenseList.length);
    updateSettings(
      { ...settings, expenseCategory: expenseList, colors: colorsList },
      accessToken,
    );
    setSettings((prev) => ({
      ...prev,
      expenseCategory: expenseList,
      colors: colorsList,
    }));
  }

  function handleChangeIncomeSource(sourceList: any) {
    updateSettings({ ...settings, incomeSource: sourceList }, accessToken);
    setSettings((prev) => ({ ...prev, incomeSource: sourceList }));
  }

  function handleChangeColor(colorsList: any) {
    updateSettings({ ...settings, colors: colorsList }, accessToken);
    setSettings((prev) => ({ ...prev, colors: colorsList }));
  }
  return (
    <Wrapper>
      <NavBar logOut={logoutAccount} changeThePage={changePage} />
      <Container>
        <HeaderData
          expense={dataFilter(expense, filter, customDateData)}
          income={dataFilter(income, filter, customDateData)}
          currency={settings.currency}
          changeFilter={changeFilter}
          submitCustomDate={submitCustomDate}
          isCustomDate={isCustomDate}
          label={{ filter: filter, customDate: customDateData }}
        />
        {pageToShow === 'wallet' && (
          <Wallet
            addBudget={addBudget}
            filter={filter}
            budget={budgetFilter(settings.budget, filter, customDateData)}
            whichForm={whichForm}
            expense={dataFilter(expense, filter, customDateData)}
            income={dataFilter(income, filter, customDateData)}
            common={common}
            currency={settings.currency}
            addExpense={addExpense}
            addIncome={addIncome}
            selectChart={selectChart}
            paginateExpense={paginateExpense}
            paginateIncome={paginateIncome}
            saveExpense={saveExpense}
            saveIncome={saveIncome}
            removeIncome={removeIncome}
            removeExpense={removeExpense}
            onSelectExpenseIncomeTable={selectTable}
            changeForm={changeForm}
            expenseCategories={settings.expenseCategory}
            incomeSource={settings.incomeSource}
          />
        )}
        {pageToShow === 'stats' && (
          <Stats
            selectChart={selectChart}
            selectedChart={common.selectedChart}
            expense={dataFilter(expense, filter, customDateData)}
            removeExpense={removeExpense}
            saveExpense={saveExpense}
            currency={settings.currency}
            colors={settings.colors}
            expenseCategories={settings.expenseCategory}
          />
        )}
        {pageToShow === 'profile' && (
          <Profile
            user={user}
            settings={settings}
            handleChangeCurrency={handleChangeCurrency}
            handleChangeExpenseCategories={handleChangeExpenseCategories}
            handleChangeIncomeSource={handleChangeIncomeSource}
            handleChangeColor={handleChangeColor}
            expense={expense}
            income={income}
          />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0px;
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-left: 15%;
  @media (max-width: 768px) {
    padding-left: 0%;
  }
`;

export default Finance;
