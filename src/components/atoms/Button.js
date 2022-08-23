import styled from 'styled-components';

const Button = (props) => (
  <StyledButton disabled={props.disabled} onClick={props.add}>
    {props.text}
  </StyledButton>
);

const StyledButton = styled.button`
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid darkgray;
  background-color: white;
  color: black;
  width: 50%;
`;

export default Button;
