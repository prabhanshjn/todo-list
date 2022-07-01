import {createStore} from "redux";

// @ts-ignore
import rootReducer from "./Reducers/RootReducer";
// @ts-ignore
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;