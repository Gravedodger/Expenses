/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useClickTarget } from '../../customHooks/useClickTarget';

const Dropdown = ({
  onDropDown,
  onRemove,
  onEdit,
  onSave,
  onClose,
  isEdit,
  isDropDownOpen,
}) => {
  const elRef = useRef(null);
  const clickedTarget = useClickTarget();

  useEffect(() => {
    if (isEdit) {
      return;
    } else if (onDropDown && elRef && !elRef.current.contains(clickedTarget)) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedTarget]);

  return (
    <Div className="dropdown" ref={elRef}>
      <button style={{ cursor: 'pointer' }} onClick={onDropDown}>
        #
      </button>
      <Div
        isDropDownOpen={isDropDownOpen}
        className="dropdown-content"
        isEdit={isEdit}
      >
        <a onClick={onRemove}>Remove</a>
        <a onClick={onEdit}>Edit</a>
        <a
          onClick={onSave}
          style={{
            display: isEdit ? 'block' : 'none',
            backgroundColor: '#44c767',
          }}
        >
          Save
        </a>
      </Div>
    </Div>
  );
};

const Div = styled.div.attrs(() => ({}))`
  @media (max-width: 798px) {
    right: 0px;
  }

  cursor: pointer;
  border-radius: 5px;
  /* The container <div> - needed to position the dropdown content */
  &.dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  &.dropdown-content {
    display: ${(props) => (props.isDropDownOpen ? 'block' : 'none')};
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    bottom: 21px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    @media (max-width: 798px) {
      right: ${({ isEdit }) => (isEdit ? '-30px' : '0px')};
      min-width: 80px;
    }
  }

  /* Links inside the dropdown */
  &.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  &.dropdown-content a:hover {
    background-color: #ddd;
  }
`;

export default Dropdown;
