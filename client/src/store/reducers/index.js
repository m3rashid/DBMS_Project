import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import UiReducer from "./ui.reducer";
import authReducer from "./auth.reducer";
import postReducer from "./post.reducer";
import errorReducer from "./error.reducer";

const reducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  ui: UiReducer,
  error: errorReducer,
  // avatar: AvatarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
