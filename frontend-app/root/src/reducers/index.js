import { combineReducers } from "redux";
import auth from "./auth";
import phrases from "./phrases";
import messages from "./messages";
import errors from "./errors";
import languages from "./languages";
import translations from "./translations";
import collections from "./collections";

export default combineReducers({
  auth,
  messages,
  errors,
  phrases,
  languages,
  translations,
  collections,
});
