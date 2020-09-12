import { combineReducers } from "redux";
// Pages and Components
import authComponentsDisplayReducer from "./components/authComponentsDisplayReducer";
import accountComponentsDisplayReducer from "./components/accountComponentsDisplayReducer";
import projectComponentsDisplayReducer from "./components/projectComponentsDisplayReducer";
import massDeleteComponentsDisplayReducer from "./components/massDeleteComponentsDisplayReducer";
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
// Mass delete
import massDeleteReducer from "./massDeleteReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";

export default combineReducers({
	authComponentsDisplay: authComponentsDisplayReducer,
	accountComponentsDisplay: accountComponentsDisplayReducer,
	projectComponentsDisplay: projectComponentsDisplayReducer,
	massDeleteComponentsDisplay: massDeleteComponentsDisplayReducer,
	displaySizeConstants: displaySizeConstantsReducer,
	displaySizeVariables: displaySizeVariablesReducer,
	priorityStatusArrays: priorityStatusOptionsReducer,
	auth: authReducer,
	account: accountReducer,
	projects: projectsReducer,
	projectsSearchFilterSort: projectsSearchFilterSortReducer,
	massDelete: massDeleteReducer,
	inputErrors: inputErrorReducer,
});
