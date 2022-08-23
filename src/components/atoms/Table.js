import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;

  width: 100%;
  tr {
    border-radius: 5px;
  }

  th,
  td {
    text-align: center;
    padding: 10px 3px 10px 3px;
    word-wrap: break-word;
    width: 15%;
    @media (max-width: 798px) {
      width: 25%;
      padding: 10px 0px 10px 0px;
    }
  }

  td:nth-child(n + 4):nth-child(-n + 4) {
    width: 55%;
    @media (max-width: 798px) {
      width: 25%;
    }
  }

  tr:hover {
    background-color: #fecac6;
    cursor: pointer;
  }
  tr:hover th {
    background-color: #e0fcd3;
  }
`;

export default Table;
