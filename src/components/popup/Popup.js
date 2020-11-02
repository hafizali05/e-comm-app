import React from "react";
import cookieHandler from "../../utils/cookieHandler";
import "./style.css";

const isOpen =
  cookieHandler("dialog").length === 0
    ? true
    : JSON.parse(cookieHandler("dialog"));
export default () => {
  const [modalState, setModalState] = React.useState(isOpen);
  return (
    <dialog
      open={modalState}
      id={"promoDialog"}
      onClick={() => {
        setModalState(false);
        document.cookie = "dialog=false";
      }}
    >
      <button type="button">X</button>
      <h1>Wait, dont go!</h1>
      <h3>
        During November use code DISCOUNT for <br /> 15% off all orders over £20
      </h3>
      <h2>32d:11h:50m:44s</h2>
    </dialog>
  );
};
