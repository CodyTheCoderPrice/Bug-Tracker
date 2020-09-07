import { combineReducers } from "redux";
// Pages and Components
import authComponentsDisplayReducer from "./components/authComponentsDisplayReducer";
import accountComponentsDisplayReducer from "./components/accountComponentsDisplayReducer";
import projectComponentsDisplayReducer from "./components/projectComponentsDisplayReducer";
// Display Sizes
import displaySizeConstantsReducer from "./displaySizes/displaySizeConstantsReducer";
import displaySizeVariablesReducer from "./displaySizes/displaySizeVariablesReducer";
// Priority Status Options
import priorityStatusOptionsReducer from "./priorityStatusOptionsReducer";
// Account
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
// Projects
import projectsReducer from "./projectsReducer";
// SearchSortFilter
import projectsSearchFilterSortReducer from "./search-filter-sort/projectsSearchFilterSortReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";

export default combineReducers({
	authComponentsDisplay: authComponentsDisplayReducer,
	accountComponentsDisplay: accountComponentsDisplayReducer,
	projectComponentsDisplay: projectComponentsDisplayReducer,
	displaySizeConstants: displaySizeConstantsReducer,
	displaySizeVariables: displaySizeVariablesReducer,
	priorityStatusArrays: priorityStatusOptionsReducer,
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	projectsSearchFilterSort: projectsSearchFilterSortReducer,
	inputErrors: inputErrorReducer,
});
