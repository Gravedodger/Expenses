import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FullSizeModal from './FullSizeModal';
import SingleBudgetItem from './SingleBudgetItem';
import { getMonth } from '../../utils/getMonth';
import Select from '../atoms/Select';
import Input from '../atoms/Input';
import AddButton from '../atoms/Button';
import { Cross } from '@styled-icons/entypo/Cross';

function removeNonRequiredCategories(budget, categories) {
  return categories.filter(
    (singcat) => !budget.some((item) => item.category === singcat),
  );
}

const SetBudget = ({
  handleShowModal,
  expenseCategories,
  addBudget,
  budget,
}) => {
  const [categories, setCategories] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const [amountInput, setAmountInput] = useState('');
  const [selectInput, setSelectInput] = useState('');

  useEffect(() => {
    const categoriesToShow = removeNonRequiredCategories(
      budget,
      expenseCategories,
    );
    setCategories(categoriesToShow);
    setBudgetList(budget);
    setSelectInput(categoriesToShow[0]);
  }, [expenseCategories, budget]);

  function handleAddToList() {
    setBudgetList((prev) => [
      ...prev,
      {
        category: selectInput,
        budget: amountInput,
      },
    ]);
    setCategories((prev) => prev.filter((item) => item !== selectInput));
    setAmountInput('');
    setSelectInput(categories[categories.indexOf(selectInput) + 1]);
  }

  function handleAmountChange(e) {
    const { value } = e.target;
    setAmountInput(value);
  }

  function handleSelectChange(e) {
    const { value } = e.target;
    setSelectInput(value);
  }

  function confirmBudget() {
    setAmountInput('');
    const budgetShape = {
      date: new Date(),
      items: budgetList,
    };
    addBudget(budgetShape);
    handleShowModal(false);
  }

  function handleRemoveBudget(budgetItem) {
    setBudgetList((prev) =>
      prev.filter((item) => item.category !== budgetItem.category),
    );
    setCategories((prev) => [...prev, budgetItem.category]);
  }

  return (
    <>
      <h2>
        Set a budget for{' '}
        {getMonth({
          filter: 'THIS_MONTH',
        })}
      </h2>
      <div>
        {budgetList.map((item) => (
          <p key={item.category}>
            {item.category}: #{Number(item.budget).toFixed(2)}{' '}
            <CrossIcon onClick={() => handleRemoveBudget(item)} />
          </p>
        ))}

        <div style={{ display: 'flex' }}>
          <Select onChange={handleSelectChange}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Input
            value={amountInput}
            type="number"
            placeholder="Amount"
            onChange={handleAmountChange}
          />
          <AddButton
            disabled={categories.length <= 0 ? true : false}
            add={handleAddToList}
            text="Add"
          />
        </div>
      </div>
      <ConfirmButton add={confirmBudget} text="Confirm" />
    </>
  );
};

const CrossIcon = styled(Cross)`
  width: 20px;
  cursor: pointer;
`;

const ConfirmButton = styled(AddButton)`
  background-color: green;
`;

const BudgetSetter = ({
  expenseCategories,
  addBudget,
  budget,
  expense,
  filter,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  function handleShowModal(cond) {
    setIsShowModal(cond);
  }

  return (
    <>
      <Header>Budget</Header>
      <Wrapper>
        {budget.length <= 0 && <p>Set your budget</p>}
        {getMonth({ filter: 'THIS_MONTH' }) === getMonth({ filter }) && (
          <Button onClick={() => handleShowModal(true)}>Add</Button>
        )}
        {budget.map((item) => {
          if (item) {
            return (
              <SingleBudgetItem
                key={item.category}
                budgetItem={item}
                expense={expense}
              />
            );
          }
          return item;
        })}
      </Wrapper>
      <FullSizeModal
        isShow={isShowModal}
        handleShowModal={handleShowModal}
        render={() => (
          <SetBudget
            handleShowModal={handleShowModal}
            expenseCategories={expenseCategories}
            addBudget={addBudget}
            budget={budget}
          />
        )}
      />
    </>
  );
};

const Header = styled.h2`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: transparent;
  border: 1px solid darkgray;
  border-radius: 5px;
`;

export default BudgetSetter;
