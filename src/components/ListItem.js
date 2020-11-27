import React from "react";
import Item from "./Item";

const ListItem = (props) => {
  const { listOfItems, deleteOnClick } = props;
  console.log("render List");
  return (
    <ul>
      {listOfItems.map((item) => {
        return (
          <Item
            key={item.id}
            id={item.id}
            text={item.text}
            deleteOnClick={deleteOnClick}
          />
        );
      })}
    </ul>
  );
};

export default ListItem;
