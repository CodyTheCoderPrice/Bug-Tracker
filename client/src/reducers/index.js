import { combineReducers } from "redux";
// Account
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
// Projects
import projectsReducer from "./projectsReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";
// Components
import accountModalDisplayReducer from "./accountModalDisplayReducer";
import navbarComponentDisplayReducer from "./navbarComponentDisplayReducer";

export default combineReducers({
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	inputErrors: inputErrorReducer,
	accountModalsDisplay: accountModalDisplayReducer,
	navbarComponentsDisplay: navbarComponentDisplayReducer,
});
