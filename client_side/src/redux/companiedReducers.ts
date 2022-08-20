import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth";
import {wishlistReducer} from "./reducers/wishlist";

const combine = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
});

export {combine};
