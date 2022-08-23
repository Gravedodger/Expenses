import { useState } from 'react';
import styled from 'styled-components';
import InputEl from '../atoms/Input';
import ButtonEl from '../atoms/Button';

interface DataType {
  startDate: string;
  finishDate: string;
}

interface Props {
  submitCustomDate: (a: any) => void;
}

const CustomDatePicker = ({ submitCustomDate }: Props) => {
  const [customdate, setcustomdate] = useState<DataType>({
    startDate: '',
    finishDate: '',
  });

  function handlestart(e: any) {
    const { value } = e.target;
    setcustomdate((prev: any) => ({ ...prev, startDate: value }));
  }

  function handlefinish(e: any) {
    const { value } = e.target;
    setcustomdate((prev: any) => ({ ...prev, finishDate: value }));
  }

  function confirmdate() {
    if (!customdate.startDate || !customdate.finishDate) {
      alert('Cannot be empty');
      return;
    }
    submitCustomDate(customdate);
  }

  return (
    <Wrapper>
      <InputContainer>
        <Input
          type="date"
          value={customdate.startDate}
          onChange={handlestart}
        />
        <Input
          type="date"
          value={customdate.finishDate}
          onChange={handlefinish}
        />
      </InputContainer>
      <ButtonContainer>
        <Button add={confirmdate} text="Confirm" />
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled(InputEl)`
  margin: 0px 5px;
  border: 1px solid darkgray;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 5px;
`;

const ButtonContainer = styled.div`
  padding: 5px;
  width: 100%;
  text-align: center;
`;

const Button = styled(ButtonEl)``;

export default CustomDatePicker;
