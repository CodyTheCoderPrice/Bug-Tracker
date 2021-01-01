import {
	BUG_CONTAINER,
} from "../actions/constants/containerNames";

export function getNumberOfBugsForStatus(
	passedReduxState,
	projectId,
	statusId
) {
	return [...passedReduxState[BUG_CONTAINER].list].filter(
		(item) => item.project_id === projectId && item.status_id === statusId
	).length;
}

export function getBugsInProjectList(passedReduxState, projectId) {
	return [...passedReduxState[BUG_CONTAINER].list].filter(
		(item) => item.project_id === projectId
	);
}
