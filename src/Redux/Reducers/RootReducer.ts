// @ts-ignore
import TodoReducer from "./TodoReducer";
// @ts-ignore
import ModelReducer from "./ModelReducer";

import { combineReducers } from "redux";
// @ts-ignore
import BankReducer from "./BankReducer";

const rootReducer = combineReducers({
  TodoReducer,
  ModelReducer,
  BankReducer,
});

export default rootReducer;
