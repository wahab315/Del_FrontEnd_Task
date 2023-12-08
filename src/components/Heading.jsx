import React from "react";

const Heading = (props) => {
  return (
    <div className="heading">
      <h1>{props.children}</h1>
    </div>
  );
};

export default Heading;
