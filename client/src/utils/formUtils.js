import { getIndexOfCompleted } from "./projectComboBoxOptionsUtils";

const isEmpty = require("is-empty");

export const toggleCharCountElementColor = (
	nameOfClass,
	descriptionLength,
	charLimit
) => {
	document.getElementsByClassName(nameOfClass)[0].style.color =
		descriptionLength > charLimit ? "red" : "black";
};

export const toggleDisableCompletionDateElements = (nameOfClass, state) => {
	let completionDateContainer = document.getElementsByClassName(nameOfClass)[0];
	let childElements = completionDateContainer.childNodes;

	if (state.status === getIndexOfCompleted()) {
		for (let child of childElements) {
			child.style.color = "black";
			child.disabled = false;
		}
	} else {
		for (let child of childElements) {
			child.style.color = "#bfbfbf";
			child.disabled = true;
		}
	}
};

export const updateCompletionDateInState = (
	nameOfClass,
	state,
	updateState
) => {
	let completionDateContainer = document.getElementsByClassName(nameOfClass)[0];
	let childElements = completionDateContainer.childNodes;

	if (state.status === getIndexOfCompleted()) {
		for (let child of childElements) {
			if (child.type === "date") {
				updateState({ ...state, completionDate: child.value });
			}
		}
	} else {
		updateState({ ...state, completionDate: null });
	}
};
