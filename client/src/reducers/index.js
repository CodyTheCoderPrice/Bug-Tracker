import { combineReducers } from "redux";
// Pages and Components
import authComponentsDisplayReducer from "./components/authComponentsDisplayReducer";
import accountComponentsDisplayReducer from "./components/accountComponentsDisplayReducer";
import projectComponentsDisplayReducer from "./components/projectComponentsDisplayReducer";
// Window Size
import windowSizeReducer from "./windowSizeReducer";
// Priority Status Options
import priorityStatusOptionsReducer from "./priorityStatusOptionsReducer";
// Account
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
// Projects
import projectsReducer from "./projectsReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";

export default combineReducers({
	authComponentsDisplay: authComponentsDisplayReducer,
	accountComponentsDisplay: accountComponentsDisplayReducer,
	projectComponentsDisplay: projectComponentsDisplayReducer,
	windowSize: windowSizeReducer,
	priorityStatusArrays: priorityStatusOptionsReducer,
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	inputErrors: inputErrorReducer,
});
