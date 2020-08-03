import React from "react";
import {} from "../../styled-components/Translator";
import { ReactComponent as AddCollectionSVG } from "../../img/svg/add-1.svg";

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
          <button onClick={addCollection}>
            <AddCollectionSVG />
          </button>
        </div>
      )}
    </div>
  );
}
