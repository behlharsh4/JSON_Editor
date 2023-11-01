import React from "react";

const AutoCompleteModal = ({ list, onClick, state }) => {
  return (
    <div
      className="AutoCompleteModal"
      style={{ ...state.style, display: state.status ? "block" : "none" }}
    >
      {list.map((l) => (
        <div className="AutoCompleteItem" onMouseDown={() => onClick(l, state)}>
          {l}
        </div>
      ))}
    </div>
  );
};

export default AutoCompleteModal;
