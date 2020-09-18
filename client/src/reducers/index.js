import { combineReducers } from "redux";

import generalContainerReducer from "./general/generalContainerReducer";
import sizeContainerReducer from "./size/sizeContainerReducer";
import accountContainerReducer from "./account/accountContainerReducer";
import projectContainerReducer from "./shared/projects/projectContainerReducer";

export default combineReducers({
	generalContainer: generalContainerReducer,
	sizeContainer: sizeContainerReducer,
	accountContainer: accountContainerReducer,
	projectContainer: projectContainerReducer,
});
