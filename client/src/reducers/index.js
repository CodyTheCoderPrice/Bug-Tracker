import { combineReducers } from "redux";
// Components
import coreComponentsDisplayReducer from "./components/coreComponentsDisplayReducer";
// Display Sizes
import displaySizeConstantsReducer from "./displaySizes/displaySizeConstantsReducer";
import displaySizeVariablesReducer from "./displaySizes/displaySizeVariablesReducer";
// Priority Status Options
import priorityStatusOptionsReducer from "./priorityStatusOptionsReducer";
// Errors
import inputErrorReducer from "./inputErrorReducer";

// Containers
import projectContainerReducer from "./containers/projectContainerReducer";
import accountContainerReducer from "./containers/accountContainerReducer";

export default combineReducers({
	accountContainer: accountContainerReducer,
	projectContainer: projectContainerReducer,

	coreComponentsDisplay: coreComponentsDisplayReducer,

	displaySizeConstants: displaySizeConstantsReducer,
	displaySizeVariables: displaySizeVariablesReducer,
	priorityStatusArrays: priorityStatusOptionsReducer,
	inputErrors: inputErrorReducer,
});
