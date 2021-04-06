// This util imports container names as it works with the redux state
import {
	BUG_CONTAINER,
} from "../actions/constants/containerNames";

/**
 * Gets the number of bugs within a project that have a particular status
 * 
 * @param {JSON} passedReduxState - Current redux state from useSelector 
 * @param {Number} projectId - Id of the project that the bugs belong to
 * @param {NUMBER} statusId - Id of the status option in question for finding
 * the number of bugs for
 * @returns The number of bugs within a project that have a particular status
 */
export function getNumberOfBugsForStatus(
	passedReduxState,
	projectId,
	statusId
) {
	// Spread operator makes deep copy of bug list so original is not affected
	return [...passedReduxState[BUG_CONTAINER].list].filter(
		(item) => item.project_id === projectId && item.status_id === statusId
	).length;
}

/**
 * Gets a list of all bugs for a particular project
 * 
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Number} projectId - Id of the project thats bugs are to be retrieved
 * @returns List of bugs for a particular project
 */
export function getBugsInProjectList(passedReduxState, projectId) {
	// Spread operator makes deep copy of bug list so original is not affected
	return [...passedReduxState[BUG_CONTAINER].list].filter(
		(item) => item.project_id === projectId
	);
}
