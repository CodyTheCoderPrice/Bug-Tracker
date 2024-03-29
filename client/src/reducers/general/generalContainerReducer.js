import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";
// Other reducers used by this reducer
import generalComponentsDisplayReducer from "./generalComponentsDisplayReducer";
import generalDropdownsDisplayReducer from "./generalDropdownsDisplayReducer";
import errorMessageReducer from "./errorMessageReducer";
import themesReducer from "../general/themesReducer";
import sortCategoriesReducer from "../general/sortCategoriesReducer";
import globalConstantsReducer from "./globalConstantsReducer";

// Initial state for 'GENERAL_CONTAINER' of the redux state
const initialState = {
	// Passing undefined and {} causes reducers to return their initial state
	componentsDisplay: generalComponentsDisplayReducer(undefined, {}),
	dropdownsDisplay: generalDropdownsDisplayReducer(undefined, {}),
	errorMessages: errorMessageReducer(undefined, {}),
	themes: themesReducer(undefined, {}),
	sortCategories: sortCategoriesReducer(undefined, {}),
	// Passed nothing since this reducer takes no parameters
	globalConstants: globalConstantsReducer(),
};

/**
 * Used to set 'GENERAL_CONTAINER' Object of the redux state.
 * 
 * Note: The purpose of this reducer is to be used by combineReducers function 
 * in store.js file to have general (i.e. info can't be cleanly placed into one
 * the other, more specific, containers) properties seperated into their own 
 * Object of the redux state for organizational purposes.
 *
 * @param {(Object|undefined)} state - Current 'GENERAL_CONTAINER' Object in the
 * redux state
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Updated 'GENERAL_CONTAINER' Object for the redux state
 */
export function generalContainerReducer(state = initialState, action) {
	switch (action.container) {
		case GENERAL_CONTAINER:
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					componentsDisplay: generalComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					dropdownsDisplay: generalDropdownsDisplayReducer(
						state.dropdownsDisplay,
						action
					),
					errorMessages: errorMessageReducer(state.errorMessages, action),
					themes: themesReducer(state.themes, action),
					sortCategories: sortCategoriesReducer(state.sortCategories, action),
					// Passed nothing since this reducer takes no parameters
					globalConstants: globalConstantsReducer(),
				};
			}
		default:
			return state;
	}
}
