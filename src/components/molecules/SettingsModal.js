import styled from 'styled-components';

const SettingsModal = ({ children, onShow }) => (
  <Wrapper onShow={onShow}>{children}</Wrapper>
);

const Wrapper = styled.div`
  display: ${({ onShow }) => (onShow ? 'block' : 'none')};
  width: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 1;
  position: fixed;
  border-radius: 5px;
  padding: 20px 20px;
`;

export default SettingsModal;
