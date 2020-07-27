import { combineReducers } from "redux";
// Account
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
// Projects
import projectsReducer from "./projectsReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";
// Components
import accountModalsReducer from "./accountModalsReducer";
import navbarDropdownsReducer from "./navbarDropdownsReducer";

export default combineReducers({
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	inputErrors: inputErrorReducer,
	accountModals: accountModalsReducer,
	navbarDropsdowns: navbarDropdownsReducer,
});
