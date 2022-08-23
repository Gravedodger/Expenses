import styled, { css } from 'styled-components';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap/ArrowLeftCircleFill';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';

const LeftRightArrowButton = ({ isOpen, onPress }) => {
  return isOpen ? (
    <LeftButton onClick={() => onPress(false)} />
  ) : (
    <RightButton onClick={() => onPress(true)} />
  );
};

const iconstyles = css`
  cursor: pointer;
  width: 25px;
  color: darkred;
  position: absolute;
  top: 50px;
  left: 100%;
`;

const LeftButton = styled(ArrowLeftCircleFill)`
  ${iconstyles}
`;

const RightButton = styled(ArrowRightCircleFill)`
  ${iconstyles}
`;

export default LeftRightArrowButton;
