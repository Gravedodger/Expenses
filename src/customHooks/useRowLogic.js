import { useState, useEffect } from "react";

const useRowLogic = item => {
  const [input, setInput] = useState({ ...item });
  const [isEdit, setIsEdit] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    setInput({ ...item });
  }, [item]);

  function inputHandler(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  function toFixedNumber(value) {
    return parseFloat(value).toFixed(2);
  }

  return {
    input,
    isEdit,
    isDropDownOpen,
    setIsEdit,
    setIsDropDownOpen,
    inputHandler,
    toFixedNumber
  };
};

export default useRowLogic;
