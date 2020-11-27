import React from "react";

const ItemCreator = (props) => {
  const { item, onItemChange, onAddItem } = props;

  return (
    <div className="item-creator">
      <h3>Item Creator</h3>
      <input value={item} onChange={onItemChange} />
      <button onClick={onAddItem}>Add new Item</button>
    </div>
  );
};

export default ItemCreator;
