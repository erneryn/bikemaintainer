import { createStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import allReducer from "./reducer";
import logger from "redux-logger";
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(logger,thunk));

const store = createStore(allReducer,enhancer); 

export default store;
