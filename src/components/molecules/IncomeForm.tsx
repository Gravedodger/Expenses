import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import StyledInput from '../atoms/Input';
import StyledSelect from '../atoms/Select';
import Button from '../atoms/Button';
import { validateIncome } from '../../utils/formValidation';
import { IncomeData } from '../../types/types';
import { getCurrentDate } from '../../utils/getCurrentDate';
import styled from 'styled-components';

interface Props {
  addIncome: (a: IncomeData) => void;
  incomeSource: string[];
}

const IncomeForm = ({ addIncome, incomeSource }: Props) => {
  return (
    <Div>
      <Formik
        initialValues={{
          date: getCurrentDate(),
          source: 'Job',
          description: '',
          amount: '',
          wallet: 'income',
        }}
        validate={validateIncome}
        onSubmit={(values, { resetForm }) => {
          addIncome(values);
          resetForm();
        }}
      >
        <Form>
          <ErrorMessage name="date" />
          <Field name="date" type="date" as={StyledInput} />
          <ErrorMessage name="source" />
          <Field name="source" as={StyledSelect}>
            {incomeSource.map((item, index) => (
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

export default IncomeForm;
