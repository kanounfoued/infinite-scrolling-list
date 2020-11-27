import React from "react";

const Statistic = (props) => {
  const {
    totalItems = 0,
    addedElements = 0,
    removedElements = 0,
    lastOperation = "none",
  } = props;

  return (
    <div className="statistics">
      <div>
        <label>Total elements: </label>
        <span>{totalItems}</span>
      </div>
      <div
        style={{
          backgroundColor: lastOperation === "ADD" ? "#09d280" : "transparent",
        }}
      >
        <label>Added element: </label>
        <span>{addedElements}</span>
      </div>
      <div
        style={{
          backgroundColor:
            lastOperation === "REMOVE" ? "#09d280" : "transparent",
        }}
      >
        <label>removed element: </label>
        <span>{removedElements}</span>
      </div>
    </div>
  );
};

export default Statistic;
