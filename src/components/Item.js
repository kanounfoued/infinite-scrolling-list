import React from "react";

const Item = React.memo(
  React.forwardRef((props, ref) => {
    const { item, deleteOnClick } = props;

    return (
      <li ref={ref} onClick={deleteOnClick(item.id)}>
        {item.title}
      </li>
    );
  })
);

export default Item;
