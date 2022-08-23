import { useState } from 'react';
import styled from 'styled-components';
import { Pencil } from '@styled-icons/boxicons-regular/Pencil';
import FullSizeModal from './FullSizeModal';
import EditDataForm from './EditDataForm';

const SingleDataItem = ({ item, remove, save, currency, sourceArr }) => {
  const [isShowFullSizeModal, setIsShowFullSizeModal] = useState(false);
  const color = item.wallet === 'expense' ? 'red' : 'green';

  function handleShowModal(cond) {
    setIsShowFullSizeModal(cond);
  }

  return (
    <>
      <MainContainer>
        <SingleContainer>
          <p>
            <b> {item.description}</b>
          </p>
          <p>{item.date}</p>
        </SingleContainer>
        <SingleContainer>
          <p style={{ color: color }}>
            {item.wallet === 'expense' && '- '}
            {currency}
            {Number(item.amount).toFixed(2)}
          </p>
          <p>{item.wallet === 'expense' ? item.category : item.source}</p>
        </SingleContainer>
        <EditPencilIcon onClick={() => handleShowModal(true)} />
      </MainContainer>
      {/* EDIT MODAL */}
      <FullSizeModal
        isShow={isShowFullSizeModal}
        handleShowModal={handleShowModal}
        render={() => (
          <EditDataForm
            handleShowModal={handleShowModal}
            item={item}
            save={save}
            remove={remove}
            sourceArr={sourceArr}
            date={item.date}
            source={item.wallet === 'expense' ? item.category : item.source}
            description={item.description}
            amount={item.amount}
            wallet={item.wallet}
          />
        )}
      />
    </>
  );
};

const EditPencilIcon = styled(Pencil)`
  width: 20px;
  cursor: pointer;
  :hover {
    color: rgb(0, 201, 167);
  }
`;

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #b5e1e6;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px;
  :hover {
    background-color: #b5e1e6;
  }
`;

const SingleContainer = styled.div`
  width: 50%;
`;

export default SingleDataItem;
