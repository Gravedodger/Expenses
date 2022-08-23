import styled from 'styled-components';

const StyledInput = styled.input`
  background-color: white;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  border: none;
  &::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export default StyledInput;
