import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer } from './reducer.js'

const middlewares=[thunk]
const store= createStore( reducer, composeWithDevTools (applyMiddleware ( ...middlewares)))

ReactDOM.render(
	<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
		
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
