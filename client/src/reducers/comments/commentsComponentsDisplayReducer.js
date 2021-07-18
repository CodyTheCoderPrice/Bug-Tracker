import { SET_WHICH_COMMENT_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Initial state for which comment components should be displayed by the app
const initialState = {
	// Which comment is being edited in ItemViewCommentsBoxIndividualComment.
	// ...If null, then no comment is being edited.
	commentBeingEdited: null,
	// Which comment will be deleted by DeleteModal for comments. If null, then
	// ...no comment is possibly being deleted.
	commentToBeDeleted: null,
};

/**
 * Used to set 'componentsDisplay' property in COMMENT_CONTAINER of the redux 
 * state for which comment components should be displayed by the app. If any 
 * expected properties in action.displays (i.e. commentBeingEdited and 
 * commentToBeDeleted) are undefined, then they will be set to null in the 
 * redux state.
 *
 * @param {{
 * 	commentBeingEdited: ({
 * 		id: number, 
 * 		bug_id: number, 
 * 		description: string, 
 * 		creation_date: string, 
 * 		last_edited_timestamp: string 
 * 	}|null),
 * 	commentToBeDeleted: ({
 * 		id: number, 
 * 		bug_id: number, 
 * 		description: string, 
 * 		creation_date: string, 
 * 		last_edited_timestamp: string 
 * 	}|null)
 * }} state - Current Object (in the redux state) for which comment components 
 * are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	commentBeingEdited: ({
 * 		id: number, 
 * 		bug_id: number, 
 * 		description: string, 
 * 		creation_date: string, 
 * 		last_edited_timestamp: string 
 * 	}|null),
 * 	commentToBeDeleted: ({
 * 		id: number, 
 * 		bug_id: number, 
 * 		description: string, 
 * 		creation_date: string, 
 * 		last_edited_timestamp: string 
 * 	}|null)
 * }} Object for which comment components should be displayed by the app
 */
export default function commentsComponentsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_COMMENT_COMPONENTS_DISPLAY:
			return {
				// Ternary operator is used to set undefined components to
				// ...null, so you only have to pass the components you want
				// ...to set to an Object, which makes using this redux action
				// ...easier
				commentBeingEdited:
					action.displays.commentBeingEdited !== undefined
						? action.displays.commentBeingEdited
						: null,
				commentToBeDeleted:
					action.displays.commentToBeDeleted !== undefined
						? action.displays.commentToBeDeleted
						: null,
			};
		default:
			return state;
	}
}
