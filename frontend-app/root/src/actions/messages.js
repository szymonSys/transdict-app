import {
  GET_ERRORS,
  CREATE_MESSAGE,
  RESET_MESSAGES,
  DELETE_MESSAGE,
} from "./types";

export const createMessage = (msgType, msgName, msgText) => ({
  type: CREATE_MESSAGE,
  payload: { msgName, msgText, msgType },
});

export const deleteMessage = (msgName) => ({
  type: DELETE_MESSAGE,
  payload: msgName,
});

export const getErrors = (message, status) => ({
  type: GET_ERRORS,
  payload: { message, status },
});

export const resetState = () => ({ type: RESET_MESSAGES });

export const MESSAGE_TYPES = {
  success: "SUCCESS",
  fail: "FAIL",
  info: "INFO",
};
