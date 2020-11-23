import {
	projectContainerName,
	bugContainerName,
} from "../reducers/containerNames";

// Standard background color
export function getProjectOrBugBackgroundColorDark(containerName) {
	return containerName === projectContainerName
		? " js-set-project-background-color-dark"
		: containerName === bugContainerName
		? " js-set-bug-background-color-dark"
		: " PROBLEM";
}

export function getProjectOrBugBackgroundColorLight(containerName) {
	return containerName === projectContainerName
		? " js-set-project-background-color-light"
		: containerName === bugContainerName
		? " js-set-bug-background-color-light"
		: " PROBLEM";
}

// Hover background color
export function getProjectOrBugBackgroundColorWithHover(containerName) {
	return containerName === projectContainerName
		? " js-set-project-background-color-with-hover"
		: containerName === bugContainerName
		? " js-set-bug-background-color-with-hover"
		: " PROBLEM";
}

// Border color
export function getProjectOrBugBorderColorDark(containerName) {
	return containerName === projectContainerName
		? " js-set-project-border-color-dark"
		: containerName === bugContainerName
		? " js-set-bug-border-color-dark"
		: " PROBLEM";
}

export function getProjectOrBugBorderColorLight(containerName) {
	return containerName === projectContainerName
		? " js-set-project-border-color-light"
		: containerName === bugContainerName
		? " js-set-bug-border-color-light"
		: " PROBLEM";
}