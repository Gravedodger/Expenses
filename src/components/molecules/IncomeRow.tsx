import React from 'react';
import Dropdown from '../atoms/Dropdown';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import useRowLogic from '../../customHooks/useRowLogic';
import { IncomeData } from '../../types/types';

interface Props {
  item: IncomeData;
  removeIncome: (a: IncomeData) => void;
  saveIncome: (a: IncomeData, b: IncomeData) => void;
  currency: string;
  incomeSource: string[];
}

const IncomeRow = ({
  item,
  removeIncome,
  saveIncome,
  currency,
  incomeSource,
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

  return (
    <tr>
      {isEdit ? (
        <td>
          <Input
            type="date"
            name="date"
            value={input.date}
            onInput={(event) => inputHandler(event)}
          />
        </td>
      ) : (
        <td>{input.date}</td>
      )}

      {isEdit ? (
        <td>
          <Select
            name="category"
            value={input.category}
            onInput={(event) => inputHandler(event)}
          >
            {incomeSource.map((item) => (
              <option key={item} value={item}>
                {' '}
                {item}{' '}
              </option>
            ))}
          </Select>
        </td>
      ) : (
        <td>{input.source}</td>
      )}

      {isEdit ? (
        <td>
          <Input
            name="amount"
            type="number"
            value={input.amount}
            onInput={(event) => inputHandler(event)}
          />
        </td>
      ) : (
        <td>
          {currency} {toFixedNumber(input.amount)}
        </td>
      )}

      {isEdit ? (
        <td>
          <Input
            type="text"
            name="description"
            value={input.description}
            onInput={(event) => inputHandler(event)}
          />
        </td>
      ) : (
        <td>{input.description}</td>
      )}

      <td>
        <Dropdown
          isDropDownOpen={isDropDownOpen}
          isEdit={isEdit}
          onDropDown={() => setIsDropDownOpen(true)}
          onEdit={() => setIsEdit(true)}
          onRemove={() => removeIncome(item)}
          onSave={() => {
            saveIncome(item, input);
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
  );
};

export default IncomeRow;
