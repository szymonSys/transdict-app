import React, { useRef, useState } from "react";
import useMessage from "../../shared/hooks/useMessage";
import AddCollectionInput from "../../components/Collection/AddCollectionInput";

import { connect } from "react-redux";
import { addCollection } from "../../actions/collections";
import { deleteMessage } from "../../actions/messages";

function AddCollection({ addCollection, deleteMessage, messages }) {
  const message = useMessage(
    "CollectionsMsg",
    () => deleteMessage("CollectionsMsg"),
    3000,
    [messages.CollectionsMsg?.text]
  );

  const handleAddCollection = () =>
    textInput.current?.value && addCollection(textInput.current.value);

  const [isHidden, toggleIsHidden] = useState(true);

  const textInput = useRef();

  const setTextInputRef = (node) => (textInput.current = node);

  return (
    <AddCollectionInput
      isHidden={isHidden}
      addCollection={handleAddCollection}
      setRef={setTextInputRef}
      toggleIsHidden={() => toggleIsHidden((isHidden) => !isHidden)}
    />
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  addCollection: (collectionName) => dispatch(addCollection(collectionName)),
  deleteMessage: (messageName) => dispatch(deleteMessage(messageName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCollection);
