import React from "react";
import ListItem from "./components/ListItem";
import Statistic from "./components/Statistic";
import ItemCreator from "./components/ItemCreator";
import "./App.css";

let items = [];
for (let i = 0; i < 1000; i++) {
  items[i] = { id: i, text: Math.floor(Math.random() * 2000) };
}

export default function App() {
  const [list, setList] = React.useState(items);
  const [addedElements, setAddedElements] = React.useState(0);
  const [removedElements, setRemovedElements] = React.useState(0);
  const [item, setItem] = React.useState("");

  const [lastOperation, setLastOperation] = React.useState("none");

  const onItemChange = (e) => {
    setItem(e.target.value);
  };

  const deleteOnClick = React.useCallback(
    (id) => () => {
      let index = list.findIndex((item) => item.id === id);
      list.splice(index, 1);
      setList([...list]);
      setRemovedElements((prevState) => prevState + 1);
      setLastOperation("REMOVE");
    },
    []
  );

  const onAddItem = (item) => () => {
    setList([...list, { id: Math.floor(Math.random() * 100000), text: item }]);
    setAddedElements((prevState) => prevState + 1);
    setItem("");
    setLastOperation("ADD");
  };

  console.log("render App");

  return (
    <div className="App">
      <ItemCreator
        onItemChange={onItemChange}
        item={item}
        onAddItem={onAddItem(item)}
      />
      <ListItem listOfItems={list} deleteOnClick={deleteOnClick} />
      <Statistic
        addedElements={addedElements}
        removedElements={removedElements}
        totalItems={list.length}
        lastOperation={lastOperation}
      />
    </div>
  );
}
