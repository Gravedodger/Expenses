import { Formik, Field, Form, ErrorMessage } from 'formik';
import StyledInput from '../atoms/Input';
import StyledSelect from '../atoms/Select';
import Button from '../atoms/Button';
import { validateExpense } from '../../utils/formValidation';
import { ExpenseData } from '../../types/types';
import { getCurrentDate } from '../../utils/getCurrentDate';
import styled from 'styled-components';

interface Props {
  addExpense: (a: ExpenseData) => void;
  expenseCategories: string[];
}

const ExpenseForm = ({ addExpense, expenseCategories }: Props) => {
  return (
    <Div>
      <Formik
        initialValues={{
          date: getCurrentDate(),
          category: 'Food',
          description: '',
          amount: '',
          wallet: 'expense',
        }}
        validate={validateExpense}
        onSubmit={(values, { resetForm }) => {
          addExpense(values);
          resetForm();
        }}
      >
        <Form>
          <ErrorMessage name="date" />
          <Field name="date" type="date" as={StyledInput} />
          <ErrorMessage name="category" />
          <Field name="category" as={StyledSelect}>
            {expenseCategories.map((item, index) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Field>
          <ErrorMessage name="amount" />
          <Field
            name="amount"
            type="number"
            placeholder="0.00"
            as={StyledInput}
          />
          <ErrorMessage name="description" />
          <Field
            name="description"
            type="text"
            placeholder="Note"
            as={StyledInput}
          />
          <Button type="submit" text="Add" />
        </Form>
      </Formik>
    </Div>
  );
};

const Div = styled.div`
  width: 75%;
  @media (max-width: 768px) {
    width: 75%;
  }
`;

export default ExpenseForm;
