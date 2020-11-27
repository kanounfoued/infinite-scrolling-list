import React from "react";

const Item = React.memo((props) => {
  const { text, id, deleteOnClick } = props;

  console.log("item render");

  return <li onClick={deleteOnClick(id)}>{text}</li>;
});

export default Item;
