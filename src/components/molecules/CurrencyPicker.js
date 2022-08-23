import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo/Cross';
import { useClickTarget } from '../../customHooks/useClickTarget';
import SettingsModal from './SettingsModal';

const SingleCurrency = React.forwardRef(({ children, handleClick }, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const elRef = useRef(null);
  const clickedTarget = useClickTarget();

  useEffect(() => {
    if (
      elRef &&
      !ref.current.contains(clickedTarget) &&
      !elRef.current.contains(clickedTarget)
    ) {
      setIsClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedTarget]);

  return (
    <CurrencyItem
      isClicked={isClicked}
      onClick={() => handleClick(setIsClicked)}
      ref={elRef}
    >
      {children}
    </CurrencyItem>
  );
});

const CurrencyPicker = ({
  currency = [
    { symbol: '€', description: 'Euros' },
    { symbol: '$', description: 'Dollars' },
    { symbol: '£', description: 'Pounds' },
  ],
  onShow = false,
  currentCurrency,
  handleChangeCurrency,
  handleShowCurrencyPicker,
}) => {
  const [currencyPicked, setCurrencyPicked] = useState('');

  useEffect(() => {
    setCurrencyPicked(currentCurrency);
  }, [currentCurrency]);

  const buttonRef = useRef(null);

  const handleClick = (symbol, setIsClicked) => {
    setIsClicked(true);
    setCurrencyPicked(symbol);
  };

  return (
    <SettingsModal onShow={onShow}>
      <Container>
        <StyledCross onClick={() => handleShowCurrencyPicker(false)} />
        <SelectedCurrency>{currencyPicked}</SelectedCurrency>
        {currency.map((item) => (
          <SingleCurrency
            key={item}
            handleClick={(setIsClicked) =>
              handleClick(item.symbol, setIsClicked)
            }
            ref={buttonRef}
          >
            {item.description} {item.symbol}
          </SingleCurrency>
        ))}
        <ConfirmButton
          onClick={() => {
            handleShowCurrencyPicker(false);
            handleChangeCurrency(currencyPicked);
          }}
          ref={buttonRef}
        >
          Confirm
        </ConfirmButton>
      </Container>
    </SettingsModal>
  );
};

const Container = styled.div`
  position: relative;
  top: 10%;
  width: 25%;
  min-height: 25%;
  margin: 0px auto;
  padding: 20px;
  background: #b5e1e6;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 50%;
    transform: translate(2.5%, 15%);
  }
`;

const CurrencyItem = styled.div`
  width: 75%;
  margin: 0px auto;
  cursor: pointer;
  padding: 1px;
  border-radius: 5px;
  text-align: center;
  background: ${({ isClicked }) => (isClicked ? 'rgb(255,153,153)' : 'none')};
  &:hover {
    background: rgb(255, 255, 153);
  }
`;

const SelectedCurrency = styled.div`
  padding: 5px;
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

export default CurrencyPicker;
