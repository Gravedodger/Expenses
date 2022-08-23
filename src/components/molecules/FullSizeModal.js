import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo/Cross';

const FullSizeModal = ({ isShow, handleShowModal, render }) => {
  return (
    <Wrapper isShow={isShow}>
      <Container>
        <CrossIcon onClick={() => handleShowModal(false)} />
        {render()}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: fixed;
  display: ${(props) => (props.isShow ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-height: 50vh;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  background-color: #b5e1e6;
  box-sizing: border-box;
  position: relative;
  @media (max-width: 768px) {
    width: 75%;
  }
`;

const CrossIcon = styled(Cross)`
  position: absolute;
  width: 20px;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default FullSizeModal;
