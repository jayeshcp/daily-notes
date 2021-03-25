import { createStore } from "redux";
import reducer from "./reducers";

const persistedState = localStorage.getItem("appData")
  ? JSON.parse(localStorage.getItem("appData"))
  : {};

const store = createStore(reducer, persistedState);

// Subscribe to store updates
// so that state can be persisted
store.subscribe(() => {
  localStorage.setItem("appData", JSON.stringify(store.getState()));
});

export default store;
