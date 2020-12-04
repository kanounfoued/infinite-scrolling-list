import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./components/ListItem";
import Statistic from "./components/Statistic";
import ItemCreator from "./components/ItemCreator";
import {
  fetchListItem,
  removeItemAction,
  addItemAction,
} from "./store/actions/listItem";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();

  // redux state
  const page = useSelector((state) => state.listItems.page);
  const hasMore = useSelector((state) => state.listItems.hasMore);
  const listItems = useSelector((state) => state.listItems.listItem);
  const isLoading = useSelector((state) => state.listItems.isLoading);
  const error = useSelector((state) => state.listItems.error);
  // redux state

  const [addedElements, setAddedElements] = React.useState(0);
  const [removedElements, setRemovedElements] = React.useState(0);
  const [item, setItem] = React.useState("");
  const [lastOperation, setLastOperation] = React.useState("none");

  const observer = React.useRef();
  const previousPage = React.useRef(-10);

  React.useEffect(() => {
    dispatch(fetchListItem(page));
  }, []);

  const onItemChange = (e) => {
    setItem(e.target.value);
  };

  const deleteOnClick = React.useCallback(
    (id) => () => {
      dispatch(removeItemAction({ id }));
      setRemovedElements((prevState) => prevState + 1);
      setLastOperation("REMOVE");
    },
    []
  );

  const onAddItem = (item) => () => {
    if (item) {
      dispatch(
        addItemAction({
          item: { title: item, id: Math.floor(Math.random() * 10000) },
        })
      );
      setAddedElements((prevState) => prevState + 1);
      setItem("");
      setLastOperation("ADD");
    }
  };

  const lastContentRef = React.useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (previousPage.current === page) return;
            previousPage.current = page;
            dispatch(fetchListItem(page));
          }
        },
        {
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page]
  );

  console.log("render App");

  return (
    <div className="App">
      <ItemCreator
        onItemChange={onItemChange}
        item={item}
        onAddItem={onAddItem(item)}
      />

      <div
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ListItem
          lastContentRef={lastContentRef}
          listOfItems={listItems}
          deleteOnClick={deleteOnClick}
        />
        {isLoading ? <label>Loading ...</label> : null}
        {error ? <label>{error}</label> : null}
      </div>

      <Statistic
        addedElements={addedElements}
        removedElements={removedElements}
        totalItems={listItems.length}
        lastOperation={lastOperation}
      />
    </div>
  );
}
