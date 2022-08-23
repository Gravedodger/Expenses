import { useState } from 'react';
import styled from 'styled-components';
import { Pencil } from '@styled-icons/boxicons-regular/Pencil';
import CurrencyPicker from '../molecules/CurrencyPicker';
import ExpenseCategoriesPicker from '../molecules/ExpenseCategoriesPicker';
import IncomeSourcePicker from '../molecules/IncomeSourcePicker';
import ColorPicker from '../molecules/ColorPicker';
import { ExpenseData, IncomeData } from '../../types/types';

interface User {
  email?: string | undefined;
  email_verified?: boolean | undefined;
  name?: string | undefined;
  nickname?: string | undefined;
  picture?: string | undefined;
  sub?: string | undefined;
  updated_at?: string | undefined;
}

interface Settings {
  expenseCategory: string[];
  incomeSource: string[];
  currency: string;
  colors: string[];
}

interface Props {
  user: User | undefined;
  settings: Settings;
  handleChangeCurrency: (a: string) => void;
  handleChangeExpenseCategories: (a: any) => void;
  handleChangeIncomeSource: (a: any) => void;
  handleChangeColor: (a: any) => void;
  expense: ExpenseData[];
  income: IncomeData[];
}

const ProfileSection = ({ user }: { user: User | undefined }) => (
  <Flex>
    <Image src={user?.picture} />
    <FlexColumn>
      <div>
        <strong>email: </strong>
        {user?.email} <PencilIcon />
      </div>
      <div>
        <strong>name: </strong>
        {user?.name} <PencilIcon />
      </div>
      <div>
        <strong>nickname: </strong>
        {user?.nickname} <PencilIcon />
      </div>
    </FlexColumn>
  </Flex>
);

const SettingsSection = ({
  handleShowCurrencyPicker,
  handleShowExpenseCategoriesPicker,
  handleShowIncomeSourcePicker,
  handleShowColorPicker,
}: {
  handleShowCurrencyPicker: (a: boolean) => void;
  handleShowExpenseCategoriesPicker: (a: boolean) => void;
  handleShowIncomeSourcePicker: (a: boolean) => void;
  handleShowColorPicker: (a: boolean) => void;
}) => (
  <FlexColumn>
    <div
      onClick={() => handleShowCurrencyPicker(true)}
      style={{ fontWeight: 'bold' }}
    >
      Currency <PencilIcon />
    </div>
    <div
      onClick={() => handleShowExpenseCategoriesPicker(true)}
      style={{ fontWeight: 'bold' }}
    >
      Expense Categories <PencilIcon />
    </div>
    <div
      onClick={() => handleShowIncomeSourcePicker(true)}
      style={{ fontWeight: 'bold' }}
    >
      Income Source <PencilIcon />
    </div>
    <div
      onClick={() => handleShowColorPicker(true)}
      style={{ fontWeight: 'bold' }}
    >
      Color picker <PencilIcon />
    </div>
  </FlexColumn>
);

const Profile = ({
  user,
  settings,
  handleChangeCurrency,
  handleChangeExpenseCategories,
  handleChangeIncomeSource,
  handleChangeColor,
  expense,
  income,
}: Props) => {
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showExpenseCategoriesPicker, setShowExpenseCategoriesPicker] =
    useState(false);
  const [showIncomeSourcePicker, setShowIncomeSourcePicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const showPicker = {
    handleShowCurrencyPicker: (shalIShow: boolean) => {
      setShowCurrencyPicker(shalIShow);
    },
    handleShowExpenseCategoriesPicker: (shalIShow: boolean) => {
      setShowExpenseCategoriesPicker(shalIShow);
    },
    handleShowIncomeSourcePicker: (shalIShow: boolean) => {
      setShowIncomeSourcePicker(shalIShow);
    },
    handleShowColorPicker: (shallIShow: boolean) => {
      setShowColorPicker(shallIShow);
    },
  };

  return (
    <>
      <Container>
        <MainDiv>
          <Div>
            <ProfileSection user={user} />
          </Div>
          <Div>
            <SettingsSection
              handleShowCurrencyPicker={showPicker.handleShowCurrencyPicker}
              handleShowExpenseCategoriesPicker={
                showPicker.handleShowExpenseCategoriesPicker
              }
              handleShowIncomeSourcePicker={
                showPicker.handleShowIncomeSourcePicker
              }
              handleShowColorPicker={showPicker.handleShowColorPicker}
            />
          </Div>
        </MainDiv>
      </Container>
      {/* MODAL WAY POPPING PICKERS */}
      <CurrencyPicker
        onShow={showCurrencyPicker}
        currentCurrency={settings.currency}
        handleChangeCurrency={handleChangeCurrency}
        handleShowCurrencyPicker={showPicker.handleShowCurrencyPicker}
      />
      <ExpenseCategoriesPicker
        onShow={showExpenseCategoriesPicker}
        handleShowExpenseCategoriesPicker={
          showPicker.handleShowExpenseCategoriesPicker
        }
        expenseCategories={settings.expenseCategory}
        handleChangeExpenseCategories={handleChangeExpenseCategories}
        expense={expense}
      />
      <IncomeSourcePicker
        onShow={showIncomeSourcePicker}
        handleShowIncomeSourcePicker={showPicker.handleShowIncomeSourcePicker}
        incomeSource={settings.incomeSource}
        handleChangeIncomeSource={handleChangeIncomeSource}
        income={income}
      />
      <ColorPicker
        onShow={showColorPicker}
        handleShowColorPicker={showPicker.handleShowColorPicker}
        colors={settings.colors}
        handleChangeColor={handleChangeColor}
      />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 15px auto;
  border-radius: 5px;
  padding: 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const MainDiv = styled.div.attrs(() => ({}))`
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 100%;
  min-height: 65vh;
  padding: 10px;
  border-radius: 5px;
  background-color: #e0fcd3;
  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

const Div = styled.div`
  padding: 10px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const PencilIcon = styled(Pencil)`
  height: 1rem;
  cursor: pointer;
  color: green;
  &:hover {
    color: red;
  }
`;

export default Profile;
