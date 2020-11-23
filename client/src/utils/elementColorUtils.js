import {
	projectContainerName,
	bugContainerName,
} from "../reducers/containerNames";

// Standard background color
export function getProjectOrBugBackgroundColorClassNameDark(containerName) {
	return containerName === projectContainerName
		? " js-set-project-background-color-dark"
		: containerName === bugContainerName
		? " js-set-bug-background-color-dark"
		: " PROBLEM";
}

export function getProjectOrBugBackgroundColorClassNameLight(containerName) {
	return containerName === projectContainerName
		? " js-set-project-background-color-light"
		: containerName === bugContainerName
		? " js-set-bug-background-color-light"
		: " PROBLEM";
}

// Hover background color
export function getProjectOrBugBackgroundColorClassNameWithHover(
	containerName
) {
	return containerName === projectContainerName
		? " js-set-project-background-color-with-hover"
		: containerName === bugContainerName
		? " js-set-bug-background-color-with-hover"
		: " PROBLEM";
}

// Border color
export function getProjectOrBugBorderColorClassNameDark(containerName) {
	return containerName === projectContainerName
		? " js-set-project-border-color-dark"
		: containerName === bugContainerName
		? " js-set-bug-border-color-dark"
		: " PROBLEM";
}

export function getProjectOrBugBorderColorClassNameLight(containerName) {
	return containerName === projectContainerName
		? " js-set-project-border-color-light"
		: containerName === bugContainerName
		? " js-set-bug-border-color-light"
		: " PROBLEM";
}

// Text and link color
export function getProjectOrBugTextColorClassName(containerName) {
	return containerName === projectContainerName
		? " js-set-project-text-color"
		: containerName === bugContainerName
		? " js-set-bug-text-color"
		: " PROBLEM";
}

export function getCurrentContainerName(passedReduxState) {
	return passedReduxState[bugContainerName].componentsDisplay.listContainer !==
		true &&
		passedReduxState[bugContainerName].componentsDisplay.itemContainer !== true
		? projectContainerName
		: bugContainerName;
}
