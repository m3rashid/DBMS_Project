import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import UiReducer from "./ui.reducer";
import AvatarReducer from "./avatar.reducer";

const reducers = combineReducers({
  // auth: AuthReducer,
  // error: errorReducer,
  // post: postReducer,
  avatar: AvatarReducer,
  ui: UiReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
