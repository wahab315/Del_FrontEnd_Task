import React from "react";

const Button = (props) => {
  return (
    <button className="button" disabled={props.disabled} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
