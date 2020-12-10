import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../reducers/containerNames";

// Standard background color
export function getProjectOrBugBackgroundColorClassNameDark(containerName) {
	return containerName === PROJECT_CONTAINER
		? " js-set-project-background-color-dark"
		: containerName === BUG_CONTAINER
		? " js-set-bug-background-color-dark"
		: " PROBLEM";
}

export function getProjectOrBugBackgroundColorClassNameLight(containerName) {
	return containerName === PROJECT_CONTAINER
		? " js-set-project-background-color-light"
		: containerName === BUG_CONTAINER
		? " js-set-bug-background-color-light"
		: " PROBLEM";
}

// Hover background color
export function getProjectOrBugBackgroundColorClassNameWithHover(
	containerName
) {
	return containerName === PROJECT_CONTAINER
		? " js-set-project-background-color-with-hover"
		: containerName === BUG_CONTAINER
		? " js-set-bug-background-color-with-hover"
		: " PROBLEM";
}

// Border color
export function getProjectOrBugBorderColorClassNameDark(containerName) {
	return containerName === PROJECT_CONTAINER
		? " js-set-project-border-color-dark"
		: containerName === BUG_CONTAINER
		? " js-set-bug-border-color-dark"
		: " PROBLEM";
}

export function getProjectOrBugBorderColorClassNameLight(containerName) {
	return containerName === PROJECT_CONTAINER
		? " js-set-project-border-color-light"
		: containerName === BUG_CONTAINER
		? " js-set-bug-border-color-light"
		: " PROBLEM";
}

// Text and link color
export function getProjectOrBugTextColorClassName(containerName) {
	return containerName === PROJECT_CONTAINER
		? " js-set-project-text-color"
		: containerName === BUG_CONTAINER
		? " js-set-bug-text-color"
		: " PROBLEM";
}

export function getCurrentContainerName(passedReduxState) {
	return passedReduxState[BUG_CONTAINER].componentsDisplay.listContainer !==
		true &&
		passedReduxState[BUG_CONTAINER].componentsDisplay.itemContainer !== true
		? PROJECT_CONTAINER
		: BUG_CONTAINER;
}
