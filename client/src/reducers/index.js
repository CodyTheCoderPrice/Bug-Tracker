import { combineReducers } from "redux";
// Account
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
// Projects
import projectsReducer from "./projectsReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";
// Components
import accountComponentsDisplayReducer from "./accountComponentsDisplayReducer";
import projectComponentsDisplayReducer from "./projectComponentsDisplayReducer";

export default combineReducers({
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	inputErrors: inputErrorReducer,
	accountComponentsDisplay: accountComponentsDisplayReducer,
	projectComponentsDisplay: projectComponentsDisplayReducer,
});
