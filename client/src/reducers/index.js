import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import inputErrorReducer from "./inputErrorReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
	auth: authReducer,
	account: accountReducer,
	inputErrors: inputErrorReducer,
	modals: modalReducer,
});
