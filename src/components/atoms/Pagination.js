import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, onPaginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex>
      {pageNumbers.map(num => (
        <Div key={num} onClick={() => onPaginate(num)}>
          {num}
        </Div>
      ))}
    </Flex>
  );
};

export default Pagination;

const Flex = styled.div`
  display: flex;
  flex-flow: row;
`;

const Div = styled.div`
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  background-color: #b5e1e6;
  :hover {
    background-color: rgb(120, 146, 194);
  }
`;
