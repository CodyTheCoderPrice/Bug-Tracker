import { SET_WHICH_COMMENT_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Initial state to guide how comment components should be displayed by the app
const initialState = {
	commentBeingEdited: null,
	commentToBeDeleted: null,
};

/**
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how comment
 * components should display by the app) in 'COMMENT_CONTAINER' of the redux 
 * state. If any properties in 'displays' prop are undefined, then they will be
 * set to null in 'componentsDisplay'.
 *
 * Note: The purpose of 'commentBeingEdited' property in 'componentsDisplay' 
 * Object is to be used by the ItemViewCommentsBoxIndividualComment component
 * to tell if the comment attached to it is being edited, and if so, display a
 * textarea to edit the comment. The purpose of 'commentToBeDeleted' property
 * is to be used to determin if the DeleteModal component should display, as
 * well as what message it should display (DeleteModal is also used for deleting
 * projects and bugs, and has a unique message for each). The reason undefined 
 * properties in 'displays' prop are set to null in 'componentsDisplay' is to
 * allow devs to only have to pass properties they wish to set to an Object 
 * (making life easier).
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
 * }} state - Current Object (in the redux state) guiding how comment 
 * components are being displayed by the app
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
 * }} Object to guide how comment components should be displayed by the app
 */
export default function commentsComponentsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_COMMENT_COMPONENTS_DISPLAY:
			return {
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
