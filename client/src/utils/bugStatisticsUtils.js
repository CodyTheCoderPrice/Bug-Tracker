import {
	projectContainerName,
	bugContainerName,
} from "../reducers/containerNames";

export function getNumberOfBugsForStatus(
	passedReduxState,
	projectId,
	statusId
) {
	return [...passedReduxState[bugContainerName].list].filter(
		(item) => item.project_id === projectId && item.status_id === statusId
	).length;
}

export function getBugsInProjectList(passedReduxState, projectId) {
	return [...passedReduxState[bugContainerName].list].filter(
		(item) => item.project_id === projectId
	);
}
