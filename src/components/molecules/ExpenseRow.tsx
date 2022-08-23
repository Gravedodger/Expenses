import styled from 'styled-components';
import Dropdown from '../atoms/Dropdown';
import InputField from '../atoms/Input';
import SelectField from '../atoms/Select';
import useRowLogic from '../../customHooks/useRowLogic';
import { ExpenseData } from '../../types/types';
import { useWindowSize } from '../../customHooks/useWindowSize';

interface Props {
  item: ExpenseData;
  removeExpense: (a: ExpenseData) => void;
  saveExpense: (a: ExpenseData, b: ExpenseData) => void;
  currency: string;
  expenseCategories: string[];
}

const Input = styled(InputField)`
  width: 100%;
`;

const Select = styled(SelectField)`
  width: 100%;
`;

const ExpenseRow = ({
  item,
  removeExpense,
  saveExpense,
  currency,
  expenseCategories,
}: Props) => {
  const {
    input,
    isEdit,
    isDropDownOpen,
    setIsEdit,
    setIsDropDownOpen,
    inputHandler,
    toFixedNumber,
  } = useRowLogic(item);
  const isMobileScreen = useWindowSize()[0] < 768;

  return (
    <>
      {!isEdit ? (
        <>
          <tr>
            <td>{input.date}</td>
            <td>{input.category}</td>
            <td>
              {currency} {toFixedNumber(input.amount)}
            </td>
            <td>{input.description}</td>
            <td>
              <Dropdown
                isDropDownOpen={isDropDownOpen}
                isEdit={isEdit}
                onDropDown={() => setIsDropDownOpen(true)}
                onEdit={() => setIsEdit(true)}
                onRemove={() => removeExpense(item)}
                onSave={() => {
                  saveExpense(item, input);
                  setIsEdit(false);
                  setIsDropDownOpen(false);
                }}
                onClose={() => {
                  setIsDropDownOpen(false);
                  setIsEdit(false);
                }}
              />
            </td>
          </tr>
        </>
      ) : (
        <>
          {isMobileScreen ? (
            <>
              <tr>
                <td colSpan={3}>
                  <Input
                    type="date"
                    name="date"
                    value={input.date}
                    onInput={(event) => inputHandler(event)}
                  />
                  <Select
                    name="category"
                    value={input.category}
                    onInput={(event) => inputHandler(event)}
                  >
                    {expenseCategories.map((item) => (
                      <option key={item} value={item}>
                        {' '}
                        {item}{' '}
                      </option>
                    ))}
                  </Select>
                  <Input
                    name="amount"
                    type="number"
                    value={input.amount}
                    onInput={(event) => inputHandler(event)}
                  />
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onInput={(event) => inputHandler(event)}
                  />
                </td>

                <td></td>
                <td>
                  <Dropdown
                    isDropDownOpen={isDropDownOpen}
                    isEdit={isEdit}
                    onDropDown={() => setIsDropDownOpen(true)}
                    onEdit={() => setIsEdit(true)}
                    onRemove={() => removeExpense(item)}
                    onSave={() => {
                      saveExpense(item, input);
                      setIsEdit(false);
                      setIsDropDownOpen(false);
                    }}
                    onClose={() => {
                      setIsDropDownOpen(false);
                      setIsEdit(false);
                    }}
                  />
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td>
                  <Input
                    type="date"
                    name="date"
                    value={input.date}
                    onInput={(event) => inputHandler(event)}
                  />
                </td>
                <td>
                  <Select
                    name="category"
                    value={input.category}
                    onInput={(event) => inputHandler(event)}
                  >
                    {expenseCategories.map((item) => (
                      <option key={item} value={item}>
                        {' '}
                        {item}{' '}
                      </option>
                    ))}
                  </Select>
                </td>
                <td>
                  <Input
                    name="amount"
                    type="number"
                    value={input.amount}
                    onInput={(event) => inputHandler(event)}
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onInput={(event) => inputHandler(event)}
                  />
                </td>
                <td>
                  <Dropdown
                    isDropDownOpen={isDropDownOpen}
                    isEdit={isEdit}
                    onDropDown={() => setIsDropDownOpen(true)}
                    onEdit={() => setIsEdit(true)}
                    onRemove={() => removeExpense(item)}
                    onSave={() => {
                      saveExpense(item, input);
                      setIsEdit(false);
                      setIsDropDownOpen(false);
                    }}
                    onClose={() => {
                      setIsDropDownOpen(false);
                      setIsEdit(false);
                    }}
                  />
                </td>
              </tr>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ExpenseRow;
