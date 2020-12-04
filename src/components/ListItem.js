import React from "react";
import Item from "./Item";

const ListItem = (props) => {
  const { listOfItems, deleteOnClick, lastContentRef } = props;

  return (
    <ul>
      {listOfItems.map((item, index) => {
        if (index === listOfItems.length - 1) {
          return (
            <Item
              key={item.id}
              ref={lastContentRef}
              item={item}
              deleteOnClick={deleteOnClick}
            />
          );
        }
        return <Item key={item.id} item={item} deleteOnClick={deleteOnClick} />;
      })}
    </ul>
  );
};

export default ListItem;
