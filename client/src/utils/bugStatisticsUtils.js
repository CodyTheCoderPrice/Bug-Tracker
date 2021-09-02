// Util uses container names to work with the redux state
import {
	BUG_CONTAINER,
} from "../actions/constants/containerNames";

/**
 * Gets the number of bugs with a particular status (statusId param) in 'list' 
 * property in 'BUG_CONTAINER' of the redux state that belong to a particular 
 * project (projectId param).
 * 
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state) 
 * @param {number} projectId - Id of the project that the bugs belong to
 * @param {number} statusId - Id of the status option in question for finding
 * the number of bugs for
 * @returns {number} The number of bugs within a project that have a particular status
 */
export function getNumberOfBugsForStatus(
	passedReduxState,
	projectId,
	statusId
) {
	// Spread operator makes a deep copy of the list of bugs so the original is
	// ...not affected
	return [...passedReduxState[BUG_CONTAINER].list].filter(
		(item) => item.project_id === projectId && item.status_id === statusId
	).length;
}

/**
 * Gets a deep copy of 'list' property in 'BUG_CONTAINER' of the redux state, 
 * filtered to only have bugs that belong to a particular project (projectId
 * param).
 * 
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {number} projectId - Id of the project thats bugs are to be retrieved
 * @returns {Object[]} List of bugs for a particular project
 */
export function getBugsInProjectList(passedReduxState, projectId) {
	// Spread operator makes a deep copy of the list of bugs so the original is
	// ...not affected
	return [...passedReduxState[BUG_CONTAINER].list].filter(
		(item) => item.project_id === projectId
	);
}
