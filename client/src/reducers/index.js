import { combineReducers } from "redux";
import authReducer from "./authReducers";
import inputErrorReducer from "./inputErrorReducers";

export default combineReducers({
	auth: authReducer,
	inputErrors: inputErrorReducer,
});
