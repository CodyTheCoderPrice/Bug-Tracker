import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import inputErrorReducer from "./inputErrorReducer";

export default combineReducers({
	auth: authReducer,
	account: accountReducer,
	inputErrors: inputErrorReducer,
});
