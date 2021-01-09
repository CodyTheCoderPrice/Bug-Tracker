import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../actions/constants/containerNames";

import { getElementStyle } from "./index";

function componentToHex(color) {
	let hex = color.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function convertRbgBackgroundColorToHex(rbgBackgroundColor) {
	const rbgValues = rbgBackgroundColor.match(/\d+/g);
	return rbgValues.length >= 3
		? rgbToHex(Number(rbgValues[0]), Number(rbgValues[1]), Number(rbgValues[2]))
		: null;
}

export function appendHexValueForColor(statusList) {
	const invisibleHomeElement = document.createElement("div");
	invisibleHomeElement.className = "js-calc-home-container";
	invisibleHomeElement.visibility = "hidden";
	document.body.appendChild(invisibleHomeElement);

	for (let i = 0; i < statusList.length; i++) {
		const invisibleStatusColorDiv = document.createElement("div");
		invisibleStatusColorDiv.className =
			"js-calc-status-box-background-color-" + statusList[i].color;
		invisibleStatusColorDiv.visibility = "hidden";
		invisibleHomeElement.appendChild(invisibleStatusColorDiv);

		const hex = convertRbgBackgroundColorToHex(
			getElementStyle(invisibleStatusColorDiv).getPropertyValue(
				"background-color"
			)
		);

		statusList[i]["colorHex"] = hex;

		invisibleHomeElement.removeChild(invisibleStatusColorDiv);
	}

	invisibleHomeElement.parentNode.removeChild(invisibleHomeElement);

	return statusList;
}

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
	return passedReduxState[BUG_CONTAINER].componentsDisplay.listView !==
		true &&
		passedReduxState[BUG_CONTAINER].componentsDisplay.itemView !== true
		? PROJECT_CONTAINER
		: BUG_CONTAINER;
}

