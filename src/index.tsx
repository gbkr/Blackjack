import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import App from "./App";
import { NEW_GAME } from './constants';
import { rootReducer } from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

function configureStore(initialState?: object) {
  return createStore(rootReducer, initialState!, composeWithDevTools());
}

const store = configureStore({
  activeHand: 0,
  credit: 1000,
  dealer: [],
  deck: [],
  newWager: false,
  player: [[]],
  result: NEW_GAME,
  wager: 0,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
