import styled from 'styled-components';

const StyledSelect = ({ children, onSelect }) => (
  <Select onChange={onSelect}>{children}</Select>
);

const Select = styled.select`
  width: 100%;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  border: none;
`;

export default StyledSelect;

// const Select = ({ children, onSelect }) => (
//   <select onChange={onSelect}>{children}</select>
// );

// export default Select;
