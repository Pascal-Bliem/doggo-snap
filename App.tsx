import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AppNavigator from "./navigation/AppNavigator";
import dogsReducer from "./store/reducers/dogs";
import { init } from "./db/db";

// initialize SQLite data base
init()
  .then(() => console.log("Initialized database"))
  .catch((err) => {
    console.log("Initializing DB failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  dogs: dogsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
