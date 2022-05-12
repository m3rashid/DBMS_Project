import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import UiReducer from "./ui.reducer";
import authReducer from "./auth.reducer";
import postReducer from "./post.reducer";

const reducers = combineReducers({
  auth: authReducer,
  posts: postReducer,
  ui: UiReducer,
  // avatar: AvatarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
