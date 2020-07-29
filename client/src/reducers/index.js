import { combineReducers } from "redux";
// Account
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
// Projects
import projectsReducer from "./projectsReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";
// Components
import accountModalsDisplayReducer from "./accountModalsDisplayReducer";
import projectComponentsDisplayReducer from "./projectComponentsDisplayReducer";
import navbarComponentsDisplayReducer from "./navbarComponentsDisplayReducer";

export default combineReducers({
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	inputErrors: inputErrorReducer,
	navbarComponentsDisplay: navbarComponentsDisplayReducer,
	projectComponentsDisplay: projectComponentsDisplayReducer,
	accountModalsDisplay: accountModalsDisplayReducer,
});
