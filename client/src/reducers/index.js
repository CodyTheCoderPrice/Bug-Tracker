import { combineReducers } from "redux";
// Components
import accountComponentsDisplayReducer from "./accountComponentsDisplayReducer";
import projectComponentsDisplayReducer from "./projectComponentsDisplayReducer";
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
	accountComponentsDisplay: accountComponentsDisplayReducer,
	projectComponentsDisplay: projectComponentsDisplayReducer,
	priorityStatusArrays: priorityStatusOptionsReducer,
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	inputErrors: inputErrorReducer,
});
