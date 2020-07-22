import React from "react";

export default function AddCollectionInput({
  toggleIsHidden,
  addCollection,
  isHidden,
  setRef,
}) {
  return (
    <div>
      <button onClick={() => toggleIsHidden((isHidden) => !isHidden)}>
        {isHidden ? "New collection" : "hidden"}
      </button>
      {isHidden || (
        <div>
          <input type="text" ref={setRef} id={"just-div"} />
          <button onClick={addCollection}>Add</button>
        </div>
      )}
    </div>
  );
}
