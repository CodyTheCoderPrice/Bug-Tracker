import { SET_DISPLAY_SIZE_VARIABLES } from "../../actions/constants/types";

// Default state for html element sizes that change
const initialState = {
	window: null,
	navbar: null,
};

/**
 * Used to set JSON containing variable (changing) html element sizes in the
 * size container of the redux state
 * 
 * @param {JSON} state - JSON of variable (changing) html element sizes used
 * mostly to calulcate the resizing of other html elements, but is sometimes
 * used for other things
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON of variable (changing) html element sizes to be
 * stored in the size container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_VARIABLES:
			return {
				window: action.sizes.window,
				navbar: action.sizes.navbar,
			};
		default:
			return state;
	}
}