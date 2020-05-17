import { combineReducers } from "redux";
import auth from "./auth";
import phrases from "./phrases";
import messages from "./messages";
import errors from "./errors";

export default combineReducers({ auth, messages, errors, phrases });
