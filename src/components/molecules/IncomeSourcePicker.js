import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo/Cross';
import { Tick } from '@styled-icons/typicons/Tick';
import SettingsModal from './SettingsModal';

const IncomeSourcePicker = ({
  incomeSource,
  onShow = false,
  handleShowIncomeSourcePicker,
  handleChangeIncomeSource,
  income,
}) => {
  const [textValue, setTextValue] = useState('');
  const [source, setSource] = useState([]);

  useEffect(() => {
    setSource(incomeSource);
  }, [incomeSource]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const addCategoryToList = () => {
    if (!textValue) {
      alert('Empty source cannot be added!');
    } else {
      setSource((prev) => [...prev, textValue]);
      setTextValue('');
    }
  };

  const deleteSourceFromList = (item) => {
    const filteredIncome = income.filter((i) => i.source === item);
    if (filteredIncome.length > 0) {
      alert(
        'This source cannot be deleted because there are income created under it',
      );
    } else {
      setSource((prev) => prev.filter((i) => i !== item));
    }
  };

  return (
    <SettingsModal onShow={onShow}>
      <Container>
        <StyledCross onClick={() => handleShowIncomeSourcePicker(false)} />
        {source.map((item) => (
          <ExpenseItem key={item}>
            {item}{' '}
            <DeleteExpenseIcon onClick={() => deleteSourceFromList(item)} />
          </ExpenseItem>
        ))}
        <InputContainer>
          <StyledTick onClick={addCategoryToList} />
          <Input type="text" value={textValue} onChange={handleTextChange} />
        </InputContainer>
        <ConfirmButton
          onClick={() => {
            handleShowIncomeSourcePicker(false);
            handleChangeIncomeSource(source);
          }}
        >
          Confirm
        </ConfirmButton>
      </Container>
    </SettingsModal>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
  top: 10%;
  width: 25%;
  min-height: 25%;
  margin: 0px auto;
  background: #b5e1e6;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 50%;
    transform: translate(2.5%, 15%);
  }
`;

const ExpenseItem = styled.div`
  position: relative;
  width: 75%;
  margin: 0px auto;
  cursor: pointer;
  padding: 1px;
  border-radius: 5px;
  text-align: center;
  &:hover {
    background: rgb(255, 255, 153);
  }
`;

const ConfirmButton = styled.button`
  cursor: pointer;
  margin: 10px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
`;

const StyledCross = styled(Cross)`
  position: absolute;
  height: 1.2rem;
  top: 5px;
  right: 5px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const DeleteExpenseIcon = styled(Cross)`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 1rem;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const InputContainer = styled.div`
  width: 75%;
  position: relative;
  margin-top: 5px;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 75%;
`;

const StyledTick = styled(Tick)`
  position: absolute;
  right: 0px;
  top: 0px;
  color: green;
  cursor: pointer;
  height: 1rem;
  &:hover {
    color: yellow;
  }
`;

export default IncomeSourcePicker;
